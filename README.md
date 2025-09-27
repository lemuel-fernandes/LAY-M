# LAY-M
```
event-manager-platform/
│
├── backend/
│
├-── app/
│    ├── server.py                        # FastAPI entry point
│    │
│    ├── api/                           # API routes
│    │   ├── v1/
│    │   │   ├── routes_tasks.py
│    │   │   ├── routes_vendors.py
│    │   │   ├── routes_volunteers.py
│    │   │   ├── routes_speakers.py
│    │   │   ├── routes_agenda.py
│    │   │   ├── routes_feedback.py
│    │   │   ├── routes_certificates.py
│    │   │   ├── routes_gallery.py
│    │   │   └── routes_ai.py           # AI endpoints
│    │   └── __init__.py
│    │
│    ├── models/                        # MongoDB models (Beanie or Pydantic BaseModel)
│    │   ├── task.py
│    │   ├── vendor.py
│    │   ├── volunteer.py
│    │   ├── speaker.py
│    │   ├── agenda.py
│    │   ├── feedback.py
│    │   ├── certificate.py
│    │   └── gallery.py
│    │
│    ├── schemas/                       # Request/response Pydantic schemas
│    │   ├── task.py
│    │   ├── vendor.py
│    │   ├── volunteer.py
│    │   ├── speaker.py
│    │   ├── agenda.py
│    │   ├── feedback.py
│    │   ├── certificate.py
│    │   └── gallery.py
│    │
│    ├── services/                      # Business logic
│    │   ├── task_service.py
│    │   ├── vendor_service.py
│    │   ├── volunteer_service.py
│    │   ├── speaker_service.py
│    │   ├── agenda_service.py
│    │   ├── feedback_service.py
│    │   ├── certificate_service.py
│    │   ├── gallery_service.py
│    │   └── ai_service.py              # Calls AI ML models or APIs
│    │
│    ├── ml/                            # Local ML models
│    │   ├── feedback_nlp.py            # Sentiment/summarization
│    │   ├── risk_forecasting.py        # Task/vendor risk scoring
│    │   ├── engagement_cv.py           # Computer Vision engagement
│    │   └── recommender.py             # Recommendations
│    │
│    ├── db/                            # MongoDB connection
│    │   ├── init_db.py                 # DB init (Motor/Beanie)
│    │   ├── db.py 
│    │
│    ├── utils/                         # Helper functions
│    │   ├── email.py                   # Email service
│    │   ├── file_upload.py             # File & image handling
│    │   ├── pdf_generator.py           # Certificate PDFs
│    │   └── ai_connector.py            # Call external AI APIs
│    │
│    ├── tests/                         # Unit & integration tests
│    │   ├── test_tasks.py
│    │   ├── test_vendors.py
│    │   ├── test_feedback.py
│    │   └── test_ai.py
│    │
│    └── __init__.py
│
├── requirements.txt                   # Python dependencies
├── .env.example                       # Example environment config
├── Dockerfile
└── README.md

│
├── ai-services/                      # AI & ML microservices (Python)
│   ├── feedback_nlp/                 # NLP models (summarization, sentiment)
│   ├── engagement_cv/                # Computer Vision for photo/video analysis
│   ├── recommendations/              # Vendor, agenda & networking suggestions
│   ├── risk_forecasting/             # Predictive models for delays/cancellations
│   ├── sustainability/               # AI models for carbon footprint & optimization
│   ├── requirements.txt              # Python dependencies
│   └── main.py                       # FastAPI/Flask entry for AI endpoints
│
├── frontend/                         # React / Next.js frontend
│   ├── public/                       # Static files (logo, icons, etc.)
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── tasks/
│   │   │   ├── vendors/
│   │   │   ├── volunteers/
│   │   │   ├── speakers/
│   │   │   ├── agenda/
│   │   │   ├── feedback/
│   │   │   ├── certificates/
│   │   │   └── gallery/
│   │   ├── pages/                    # App routes (if Next.js) or views (React Router)
│   │   ├── hooks/                    # Custom React hooks (e.g., useFetch, useAuth)
│   │   ├── contexts/                 # Context API (auth, theme, notifications)
│   │   ├── services/                 # API client wrappers (Axios/GraphQL)
│   │   ├── store/                    # State management (Redux/Zustand/Recoil)
│   │   ├── styles/                   # Global & module-specific styles
│   │   └── App.js
│   ├── package.json
│
├── docs/                             # Documentation
│   ├── requirements.md                # Functional & non-functional requirements
│   ├── architecture.md                # System architecture, diagrams
│   ├── api-specs.md                   # API endpoints & contracts
│   ├── ai-models.md                   # AI/ML model details
│   └── demo-script.md                 # Script for Vibeathon demo video
│
├── scripts/                          # Deployment & automation scripts
│   ├── seed.js                       # Seed DB with sample data
│   ├── deploy.sh                     # Deployment automation
│   └── backup.sh                     # Backup automation
│
├── .env.example                      # Example env file
├── docker-compose.yml                 # Docker setup (backend + AI + DB)
├── README.md
└── package.json                       # Root project (monorepo config if using Nx/Turbo)

```

for backend
```
cd backend 
python -m venv venv
venv/scripts/activate
pip install -r requirements.txt
```