# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from fastapi import APIRouter, HTTPException

from ..schemas.endpoint import Endpoint
from typing import List

router = APIRouter(prefix="/endpoints", tags=["endpoints"])

fake_endpoints_db = [
    {
        "id": 1,
        "userId": 1,
        "type": "IPv4",
        "address": "10.0.0.2",
        "active": True
    },
    {
        "id": 2,
        "userId": 1,
        "type": "IPv4",
        "address": "10.0.0.10",
        "active": False
    },
    {
        "id": 3,
        "userId": 2,
        "type": "IPv6",
        # address abbreviated to better display
        "address": "1f7b:63ed:72ce:9e8b",
        "active": True
    },
    {
        "id": 4,
        "userId": 3,
        "type": "IPv6",
        # address abbreviated to better display
        "address": "2957:8c4d:6f4f:610c",
        "active": True
    },
    {
        "id": 5,
        "userId": 3,
        "type": "IPv4",
        "address": "145.172.18.1",
        "active": False
    }
]


@router.get("/{endpoint_id}", response_model=Endpoint)
async def get_endpoint(endpoint_id: int):
    endpoint = [ep for ep in fake_endpoints_db if ep["id"] == endpoint_id]
    if not endpoint:
        raise HTTPException(status_code=404,
                            detail=f"Endpoint {endpoint_id} not found")

    return endpoint[0]


@router.get("/user/{user_id}", response_model=List[Endpoint])
async def get_endpoints_for_user(user_id: int):
    endpoints = [ep for ep in fake_endpoints_db if ep["userId"] == user_id]
    return endpoints
