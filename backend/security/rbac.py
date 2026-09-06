# ============================================================
# ROLE BASED ACCESS CONTROL
# ============================================================


ROLE_PERMISSIONS = {

    "investigator": [

        "dashboard:investigator",

        "data:view_own"

    ],


    "studycoordinator": [

        "dashboard:studycoordinator",

        "data:view_assigned",

        "data:entry"

    ],


    "ethicscommittee": [

        "dashboard:ethicscommittee",

        "approval:view",

        "approval:review"

    ],


    "pharmacovigilance": [

        "dashboard:pharmacovigilance",

        "safety:view",

        "safety:manage"

    ]

}


# ============================================================
# GET ROLE PERMISSIONS
# ============================================================

def get_permissions(role: str):

    return ROLE_PERMISSIONS.get(
        role,
        []
    )


# ============================================================
# CHECK PERMISSION
# ============================================================

def has_permission(
    role: str,
    permission: str
):

    permissions = get_permissions(role)

    return permission in permissions


# ============================================================
# CHECK ROLE
# ============================================================

def has_role(
    user_role: str,
    allowed_roles: list[str]
):

    return user_role in allowed_roles