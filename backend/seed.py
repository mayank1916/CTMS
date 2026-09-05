from database import (

    SessionLocal,

    engine,

    Base

)


from models import User


from auth.login import hash_password



# CREATE TABLES

Base.metadata.create_all(

    bind=engine

)



db = SessionLocal()



demo_users = [


    {

        "username": "pi_user",

        "password": "PI123",

        "role": "PI"

    },


    {

        "username": "coordinator_user",

        "password": "COORD123",

        "role": "COORDINATOR"

    },


    {

        "username": "ethics_user",

        "password": "ETHICS123",

        "role": "ETHICS"

    },


    {

        "username": "leadership_user",

        "password": "LEADER123",

        "role": "LEADERSHIP"

    },


    {

        "username": "regulator_user",

        "password": "REG123",

        "role": "REGULATOR"

    }

]



for user_data in demo_users:


    existing_user = db.query(

        User

    ).filter(

        User.username

        == user_data["username"]

    ).first()



    if not existing_user:


        user = User(

            username=user_data["username"],

            password_hash=hash_password(

                user_data["password"]

            ),

            role=user_data["role"]

        )



        db.add(user)



db.commit()

db.close()



print(

    "Demo users created successfully!"

)