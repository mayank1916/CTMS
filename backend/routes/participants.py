from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Participant, Study
from schemas import ParticipantCreate
from security.permissions import (
    get_current_user,
    require_permission
)


router = APIRouter(

    prefix="/participants",

    tags=["Participants"]

)


# ============================================================
# CREATE PARTICIPANT
# ONLY STUDY COORDINATOR
# ============================================================

@router.post("/")

def create_participant(

    participant: ParticipantCreate,

    user=Depends(

        require_permission(

            "CREATE_PARTICIPANT"

        )

    ),

    db: Session = Depends(
        get_db
    )

):


    study = db.query(

        Study

    ).filter(

        Study.id == participant.study_id

    ).first()


    if not study:


        raise HTTPException(

            status_code=404,

            detail="Study not found"

        )


    new_participant = Participant(


        participant_code=participant.participant_code,


        name=participant.name,


        age=participant.age,


        phone=participant.phone,


        email=participant.email,


        consent_given=participant.consent_given,


        consent_purpose=participant.consent_purpose,


        study_id=participant.study_id

    )


    db.add(

        new_participant

    )


    db.commit()


    db.refresh(

        new_participant

    )


    return new_participant


# ============================================================
# GET PARTICIPANTS
# ============================================================

@router.get("/study/{study_id}")

def get_participants(

    study_id: int,

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


    study = db.query(

        Study

    ).filter(

        Study.id == study_id

    ).first()


    if not study:


        raise HTTPException(

            status_code=404,

            detail="Study not found"

        )


    # ========================================================
    # INVESTIGATOR
    # ONLY OWN STUDY PARTICIPANTS
    # ========================================================

    if role == "INVESTIGATOR":


        if study.investigator_id != user_id:


            raise HTTPException(

                status_code=403,

                detail="You cannot access participants of this study"

            )


    # ========================================================
    # PHARMACOVIGILANCE
    # NO PATIENT PERSONAL DATA
    # ========================================================

    if role == "PHARMACOVIGILANCE":


        participants = db.query(

            Participant

        ).filter(

            Participant.study_id == study_id

        ).all()


        return [


            {


                "id": participant.id,


                "participant_code":

                    participant.participant_code,


                "age":

                    participant.age,


                "study_id":

                    participant.study_id

            }


            for participant in participants

        ]


    participants = db.query(

        Participant

    ).filter(

        Participant.study_id == study_id

    ).all()


    return participants


# ============================================================
# UPDATE PARTICIPANT
# ONLY STUDY COORDINATOR
# ============================================================

@router.put("/{participant_id}")

def update_participant(

    participant_id: int,

    participant_data: ParticipantCreate,

    user=Depends(

        require_permission(

            "EDIT_PARTICIPANT"

        )

    ),

    db: Session = Depends(
        get_db
    )

):


    participant = db.query(

        Participant

    ).filter(

        Participant.id == participant_id

    ).first()


    if not participant:


        raise HTTPException(

            status_code=404,

            detail="Participant not found"

        )


    participant.participant_code = (

        participant_data.participant_code

    )


    participant.name = (

        participant_data.name

    )


    participant.age = (

        participant_data.age

    )


    participant.phone = (

        participant_data.phone

    )


    participant.email = (

        participant_data.email

    )


    participant.consent_given = (

        participant_data.consent_given

    )


    participant.consent_purpose = (

        participant_data.consent_purpose

    )


    db.commit()


    db.refresh(

        participant

    )


    return participant