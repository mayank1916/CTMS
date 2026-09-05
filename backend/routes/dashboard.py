from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Study, Participant
from security.permissions import get_current_user


router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get("/")

def get_dashboard(

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
    # ========================================================

    if role == "INVESTIGATOR":


        total_studies = db.query(

            Study

        ).filter(

            Study.investigator_id == user_id

        ).count()


        return {


            "role":

                "INVESTIGATOR",


            "total_studies":

                total_studies

        }


    # ========================================================
    # STUDY COORDINATOR
    # ========================================================

    if role == "STUDY_COORDINATOR":


        return {


            "role":

                "STUDY_COORDINATOR",


            "total_studies":

                db.query(

                    Study

                ).count(),


            "total_participants":

                db.query(

                    Participant

                ).count()

        }


    # ========================================================
    # ETHICS COMMITTEE
    # ========================================================

    if role == "ETHICS_COMMITTEE":


        return {


            "role":

                "ETHICS_COMMITTEE",


            "total_studies":

                db.query(

                    Study

                ).count()


        }


    # ========================================================
    # PHARMACOVIGILANCE
    # ========================================================

    if role == "PHARMACOVIGILANCE":


        return {


            "role":

                "PHARMACOVIGILANCE",


            "total_studies":

                db.query(

                    Study

                ).count()


        }


    return {

        "message":

            "No dashboard available"

    }