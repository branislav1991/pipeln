# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from fastapi import APIRouter, HTTPException

from ..schemas.user import User

router = APIRouter(prefix="/users", tags=["users"])

fake_users_db = [
    {
        "id": 1,
        "connections": [2, 3],
        "username": "@johndoe",
        "email": "john.doe@example.com"
    },
    {
        "id": 2,
        "connections": [1],
        "username": "@jackwelch",
        "email": "jack.welch@example.com"
    },
    {
        "id": 3,
        "connections": [1],
        "username": "@barbaras",
        "email": "barbara.sample@example.com"
    },
]


@router.get("/{id}", response_model=User)
async def get_user(id: int):
    user = [usr for usr in fake_users_db if usr["id"] == id]
    if not user:
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    return user[0]
