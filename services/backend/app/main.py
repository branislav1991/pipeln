from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from .routers import contracts

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contracts.router)


@app.get("/")
async def get_main():
    """Return empty response to satisfy Application Gateway health check.
    """
    return Response()
