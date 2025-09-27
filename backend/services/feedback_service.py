import spacy
import torch
from transformers import pipeline
from models.Feedback import FeedbackModel
from models.Events import EventModel 
from typing import List, Dict, Any
from db.db import db

class FeedbackAnalyzer:
    def __init__(self):
        # Load SpaCy model for topic extraction
        self.nlp = spacy.load("en_core_web_sm")
        # Load sentiment analyzer
        self.sentiment_analyzer = pipeline("sentiment-analysis")

    async def analyze_feedback(self, text: str) -> Dict[str, Any]:
        # Analyze sentiment
        sentiment = self.sentiment_analyzer(text)[0]
        
        # Extract key topics
        doc = self.nlp(text)
        topics = [chunk.text for chunk in doc.noun_chunks]
        
        return {
            "sentiment_score": float(sentiment["score"]),
            "key_topics": list(set(topics))[:5]  # Top 5 unique topics
        }

    async def generate_event_report(self, event_id: str) -> Dict[str, Any]:
        # Get all feedback for the event
        feedbacks = await db.feedback.find({"event_id": event_id}).to_list(None)
        event = await db.events.find_one({"_id": event_id})
        
        if not feedbacks:
            return {"error": "No feedback found for this event"}

        # Aggregate analysis
        total_sentiment = 0
        all_topics = []
        
        for feedback in feedbacks:
            total_sentiment += feedback.get("sentiment_score", 0) or 0
            all_topics.extend(feedback.get("key_topics", []) or [])

        avg_sentiment = total_sentiment / len(feedbacks)
        topic_frequency = {topic: all_topics.count(topic) for topic in set(all_topics)}
        
        return {
            "event_title": event.get("title"),
            "total_feedback": len(feedbacks),
            "average_rating": sum(f.get("rating", 0) for f in feedbacks) / len(feedbacks),
            "average_sentiment": avg_sentiment,
            "top_topics": dict(sorted(topic_frequency.items(), key=lambda x: x[1], reverse=True)[:5]),
            "sentiment_distribution": {
                "positive": len([f for f in feedbacks if (f.get("sentiment_score", 0) or 0) > 0.6]),
                "neutral": len([f for f in feedbacks if 0.4 <= (f.get("sentiment_score", 0) or 0) <= 0.6]),
                "negative": len([f for f in feedbacks if (f.get("sentiment_score", 0) or 0) < 0.4])
            }
        }