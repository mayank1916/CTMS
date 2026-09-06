import pyotp

from database import SessionLocal

from models import User

from pwdlib import PasswordHash


password_hash = PasswordHash.recommended()


# ============================================================
# DATABASE
# ============================================================

db = SessionLocal()


# ============================================================
# TEST USERS
# ============================================================

users = [

    {
        "username": "investigator",
        "password": "Password123",
        "role": "investigator"
    },

    {
        "username": "coordinator",
        "password": "Password123",
        "role": "studycoordinator"
    },

    {
        "username": "ethics",
        "password": "Password123",
        "role": "ethicscommittee"
    },

    {
        "username": "pharmacovigilance",
        "password": "Password123",
        "role": "pharmacovigilance"
    }

]


# ============================================================
# CREATE USERS
# ============================================================

for user_data in users:

    existing_user = (

        db.query(User)

        .filter(

            User.username == user_data["username"]

        )

        .first()

    )


    if existing_user:

        print(

            f"{user_data['username']} already exists"

        )

        continue


    user = User(

        username=user_data["username"],

        password_hash=password_hash.hash(

            user_data["password"]

        ),

        role=user_data["role"],

        mfa_secret=pyotp.random_base32(),

        mfa_enabled=False,

        is_active=True

    )


    db.add(user)


db.commit()


print("Stage 4 test users created successfully")


db.close()