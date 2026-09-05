ROLE_PERMISSIONS = {


    "investigator": [

        "dashboard:investigator",

        "data:view_own"

    ],


    "studycoordinator": [

        "dashboard:studycoordinator",

        "data:view_assigned"

    ],


    "ethicscommittee": [

        "dashboard:ethicscommittee",

        "data:view_masked"

    ],


    "pharmacovigilance": [

        "dashboard:pharmacovigilance",

        "data:view_masked"

    ]

}


def role_has_permission(

    role: str,

    permission: str

):

    permissions = ROLE_PERMISSIONS.get(
        role,
        []
    )


    return permission in permissions