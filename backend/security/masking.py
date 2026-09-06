def mask_value(value):

    if value is None:

        return None


    return "********"


def mask_participant_data(

    data: dict,

    role: str

):

    protected_data = data.copy()


    sensitive_fields = [

        "name",

        "phone",

        "email",

        "address"

    ]


    if role in [

        "ethicscommittee",

        "pharmacovigilance"

    ]:

        for field in sensitive_fields:

            if field in protected_data:

                protected_data[field] = mask_value(
                    protected_data[field]
                )


    return protected_data