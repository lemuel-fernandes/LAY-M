from typing import List, Dict, Any
from collections import Counter
import re
import os
import httpx
from datetime import datetime, timedelta
from bson import ObjectId
from typing import Optional

class AIService:
    """
    AIService using Gemini-like Generative API for:
      - Generative Project Planning
      - Predictive Task Management (heuristic + model augmentation)
      - Automated Post-Event Reporting (uses DB + generative model)
    Also retains volunteer recommendation utilities.
    """

    def __init__(self, db):
        # db: motor async database instance
        self.db = db
        self.events = db["events"]
        self.users = db["users"]
        self.tasks = db.get_collection("tasks")
        self.feedback = db.get_collection("feedback")  # optional

        # Gemini / Generative API config
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        self.gemini_model = os.getenv("GEMINI_MODEL", "models/text-bison-001")
        self.gemini_endpoint = os.getenv(
            "GEMINI_ENDPOINT",
            f"https://generativelanguage.googleapis.com/v1beta2/{self.gemini_model}:generate"
        )

    async def _gemini_generate(self, prompt: str, temperature: float = 0.2, max_tokens: int = 512) -> str:
        """
        Minimal async wrapper to call a Gemini-like generative REST endpoint.
        Requires GEMINI_API_KEY env var (API key appended as ?key=...).
        Returns best-effort text or an error string.
        """
        if not self.gemini_key:
            return "Gemini API key not configured."

        url = f"{self.gemini_endpoint}?key={self.gemini_key}"
        payload = {
            "prompt": {"text": prompt},
            "temperature": temperature,
            "maxOutputTokens": max_tokens
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            try:
                resp.raise_for_status()
            except Exception:
                return f"Gemini error: {resp.status_code} - {resp.text}"

            data = resp.json()

            # Try common response shapes
            if "candidates" in data and isinstance(data["candidates"], list) and data["candidates"]:
                cand = data["candidates"][0]
                # some variants use 'content' or 'output' keys
                return cand.get("content") or cand.get("output") or str(cand)
            if "output" in data and isinstance(data["output"], dict):
                # newer shapes may include 'text' under output
                text = data["output"].get("text")
                if text:
                    return text
            # fallback to any text-like field
            for k in ("text", "response", "content"):
                if k in data:
                    return str(data[k])
            return str(data)

    async def generate_project_plan(self, event_id: str, constraints: Optional[Dict[str, Any]] = None) -> str:
        """
        Produce a project plan for an event using event data + generative model.
        """
        try:
            oid = ObjectId(event_id)
        except Exception:
            return "Invalid event id"

        event = await self.events.find_one({"_id": oid})
        if not event:
            return "Event not found"

        title = event.get("title", "Untitled Event")
        desc = event.get("description", "")
        dates = event.get("dates") or event.get("date", "")
        required_skills = ", ".join(event.get("required_skills", []))

        prompt = (
            f"Create a concise project plan for the event titled '{title}'.\n\n"
            f"Description: {desc}\n"
            f"Dates: {dates}\n"
            f"Required skills: {required_skills}\n\n"
            f"Constraints: {constraints or {}}\n\n"
            "Produce:\n"
            "- Key milestones with dates or relative timeline\n"
            "- Roles & responsibilities\n"
            "- Suggested volunteer counts by role\n"
            "- Risks & mitigation\n"
            "- Short task list (prioritized)\n"
        )
        return await self._gemini_generate(prompt, temperature=0.25, max_tokens=700)

    async def predictive_task_management(self, event_id: str, lookahead_days: int = 7) -> Dict[str, Any]:
        """
        Heuristic predictive logic for tasks + optional model augmentation.
        Returns simple risk scores per task and optional recommendations.
        """
        try:
            oid = ObjectId(event_id)
        except Exception:
            return {"error": "invalid_event_id"}

        event = await self.events.find_one({"_id": oid})
        if not event:
            return {"error": "event_not_found"}

        # collect tasks linked to event (assume event_id stored as string)
        cursor = self.tasks.find({"event_id": event_id})
        tasks = []
        async for t in cursor:
            tasks.append(t)

        results = []
        for t in tasks:
            score = 0.0
            if not t.get("assignee"):
                score += 0.5
            due = t.get("due_date")
            status = (t.get("status") or "open").lower()
            if due:
                try:
                    due_dt = datetime.fromisoformat(due)
                    if due_dt < datetime.utcnow():
                        score += 0.4
                    elif due_dt < datetime.utcnow() + timedelta(days=lookahead_days):
                        score += 0.2
                except Exception:
                    pass
            if status in ("blocked", "stalled"):
                score += 0.5

            score = min(1.0, score)
            results.append({"task_id": str(t.get("_id")), "title": t.get("title"), "risk_score": round(score, 3)})

        prompt = (
            f"For event '{event.get('title')}', provide short recommendations to reduce task risk.\n"
            f"Tasks summary: {[(r['task_id'], r['title'], r['risk_score']) for r in results]}\n"
            "List up to 5 actionable recommendations."
        )
        recommendations = await self._gemini_generate(prompt, temperature=0.2, max_tokens=300)
        return {"event_id": event_id, "tasks": results, "recommendations": recommendations}

    async def automated_postevent_report(self, event_id: str) -> str:
        """
        Build a post-event report by summarizing feedback, attendance and key metrics, then use Gemini
        to create a polished narrative report.
        """
        try:
            oid = ObjectId(event_id)
        except Exception:
            return "Invalid event id"

        event = await self.events.find_one({"_id": oid})
        if not event:
            return "Event not found"

        # Gather feedback texts
        feedback_cursor = self.feedback.find({"event_id": event_id})
        texts = []
        async for f in feedback_cursor:
            t = f.get("text") or f.get("comment") or ""
            if t:
                texts.append(t)

        # Basic extractive summary
        joined = " ".join(texts)[:3000]
        sentences = re.split(r'(?<=[.!?])\s+', joined)
        top_text = " ".join(sentences[:6])

        prompt = (
            f"Write a professional post-event report for the event '{event.get('title')}'.\n\n"
            f"Event summary: {event.get('description', '')}\n"
            f"Dates: {event.get('dates') or event.get('date', '')}\n\n"
            f"Key metrics: attendees: {event.get('attendees_count', 'N/A')}, volunteers: {len(event.get('volunteers', []))}\n\n"
            f"Feedback excerpt: {top_text}\n\n"
            "Produce:\n- Executive summary (3-4 sentences)\n- What went well\n- Opportunities & recommendations\n- Suggested follow-ups & owner roles\n"
        )

        return await self._gemini_generate(prompt, temperature=0.2, max_tokens=800)

    # --- keep existing volunteer helper ---
    async def summarize_feedback(self, texts: List[str], max_chars: int = 300) -> str:
        if not texts:
            return ""
        joined = " ".join(texts)
        sentences = re.split(r'(?<=[.!?])\s+', joined)
        sentences = [s.strip() for s in sentences if s.strip()]
        summary = ""
        for s in sentences:
            if len(summary) + len(s) + 1 > max_chars:
                break
            summary += (s + " ")
        if not summary:
            summary = joined[:max_chars]
        return summary.strip()

    async def score_volunteer(self, volunteer_profile: Dict[str, Any], event: Dict[str, Any]) -> float:
        skills_v = set((volunteer_profile.get("skills") or []))
        required = set((event.get("required_skills") or []))
        if not skills_v and not required:
            skill_score = 0.5
        elif not required:
            skill_score = 0.5 + 0.5 * (len(skills_v) / max(1, len(skills_v)))
        else:
            inter = skills_v.intersection(required)
            union = required.union(skills_v)
            skill_score = len(inter) / max(1, len(union))

        avail_bonus = 0.0
        ev_dates = event.get("dates") or event.get("date")
        vol_avail = volunteer_profile.get("availability")
        if ev_dates and vol_avail:
            if isinstance(ev_dates, list):
                overlap = any(d in vol_avail for d in ev_dates)
            else:
                overlap = ev_dates in vol_avail
            if overlap:
                avail_bonus = 0.25

        score = min(1.0, skill_score * 0.75 + avail_bonus)
        return float(score)

    async def recommend_volunteers(self, event_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        try:
            oid = ObjectId(event_id)
        except Exception:
            return []

        event = await self.events.find_one({"_id": oid})
        if not event:
            return []

        required = set(event.get("required_skills") or [])
        cursor = self.users.find({})
        candidates = []
        async for u in cursor:
            score = await self.score_volunteer(u, event)
            candidates.append((score, u))

        candidates.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, u in candidates[:limit]:
            upop = {k: v for k, v in u.items() if k not in ("password",)}
            upop["score"] = round(score, 3)
            upop["_id"] = str(upop.get("_id"))
            results.append(upop)
        return results