from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from auth.login import router as auth_router

# Import models so SQLAlchemy knows all tables
import models


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="CTMS Security API",
    version="1.0.0",
    description="Stage 4 - Authentication, JWT, MFA and RBAC"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ============================================================
# ROUTES
# ============================================================

# ONLY STAGE 4 ROUTES

app.include_router(auth_router)


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():
    return {
        "message": "CTMS Backend Running",
        "stage": "Stage 4 - Security and Access Control",
        "security": [
            "Password Hashing",
            "JWT Authentication",
            "MFA",
            "RBAC",
            "Audit Logging"
        ],
        "roles": [
            "investigator",
            "studycoordinator",
            "ethicscommittee",
            "pharmacovigilance"
        ]
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }