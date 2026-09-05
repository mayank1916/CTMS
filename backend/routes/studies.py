from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Study
from schemas import StudyCreate
from security.permissions import (
    get_current_user,
    require_permission,
    require_roles
)


router = APIRouter(

    prefix="/studies",

    tags=["Studies"]

)


# ============================================================
# CREATE STUDY
# ONLY INVESTIGATOR
# ============================================================

@router.post("/")

def create_study(

    study: StudyCreate,

    user=Depends(

        require_permission(

            "CREATE_STUDY"

        )

    ),

    db: Session = Depends(
        get_db
    )

):


    new_study = Study(


        title=study.title,


        description=study.description,


        investigator_id=int(

            user["sub"]

        )


    )


    db.add(

        new_study

    )


    db.commit()


    db.refresh(

        new_study

    )


    return new_study


# ============================================================
# GET STUDIES
# ============================================================

@router.get("/")

def get_studies(

    user=Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):


    role = user.get(

        "role"

    )


    user_id = int(

        user.get(

            "sub"

        )

    )


    # ========================================================
    # INVESTIGATOR
    # ONLY OWN STUDIES
    # ========================================================

    if role == "INVESTIGATOR":


        studies = db.query(

            Study

        ).filter(

            Study.investigator_id == user_id

        ).all()


        return studies


    # ========================================================
    # STUDY COORDINATOR
    # ========================================================

    if role == "STUDY_COORDINATOR":


        return db.query(

            Study

        ).all()


    # ========================================================
    # ETHICS COMMITTEE
    # ========================================================

    if role == "ETHICS_COMMITTEE":


        return db.query(

            Study

        ).all()


    # ========================================================
    # PHARMACOVIGILANCE
    # ========================================================

    if role == "PHARMACOVIGILANCE":


        return db.query(

            Study

        ).all()


    raise HTTPException(

        status_code=403,

        detail="Access denied"

    )