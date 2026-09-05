from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from auth.login import router as auth_router

from routes.studies import router as studies_router

from routes.participants import router as participants_router

from routes.dashboard import router as dashboard_router


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(

    bind=engine

)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(

    title="CTMS Security API",

    version="1.0.0"

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

app.include_router(

    auth_router

)


app.include_router(

    studies_router

)


app.include_router(

    participants_router

)


app.include_router(

    dashboard_router

)


# ============================================================
# HOME
# ============================================================

@app.get("/")

def home():

    return {


        "message":

            "CTMS Backend Running",

        "security":

            "JWT + RBAC",

        "roles":

            [

                "INVESTIGATOR",

                "STUDY_COORDINATOR",

                "ETHICS_COMMITTEE",

                "PHARMACOVIGILANCE"

            ]

    }