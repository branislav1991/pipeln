# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from fastapi import APIRouter, HTTPException

from ..schemas.endpoint import Endpoint

router = APIRouter(prefix="/endpoints", tags=["endpoints"])

fake_endpoints_db = [
    {
        "id": 1,
        "type": "IPv4",
        "address": "10.0.0.2",
    },
    {
        "id": 2,
        "type": "IPv4",
        "address": "10.0.0.10",
    },
    {
        "id": 3,
        "type": "IPv6",
        # address abbreviated to better display
        "address": "1f7b:63ed:72ce:9e8b",
    },
    {
        "id": 4,
        "type": "IPv6",
        # address abbreviated to better display
        "address": "2957:8c4d:6f4f:610c",
    },
    {
        "id": 5,
        "type": "IPv4",
        "address": "145.172.18.1",
    }
]


@router.get("/{endpoint_id}", response_model=Endpoint)
async def get_endpoints(endpoint_id: int):
    endpoint = [ep for ep in fake_endpoints_db if ep["id"] == endpoint_id]
    if not endpoint:
        raise HTTPException(status_code=404, detail="Endpoint not found")

    return endpoint[0]
