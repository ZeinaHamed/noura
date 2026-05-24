import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routes.fitness import router as fitness_router
from routes.physical_therapy import router as pt_router

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Noura API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fitness_router, prefix="/api/generate")
app.include_router(pt_router, prefix="/api/generate")


@app.get("/api/health")
def health():
    return {"status": "ok"}


# Export limiter so routes can import it
__all__ = ["limiter"]
