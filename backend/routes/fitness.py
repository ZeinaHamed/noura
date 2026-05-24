import json
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from models import FitnessInput
from services.claude import stream_fitness_program

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


def sse_generator(inp: FitnessInput):
    try:
        for delta in stream_fitness_program(inp):
            yield f"data: {json.dumps({'text': delta})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"
    yield "data: [DONE]\n\n"


@router.post("/fitness")
@limiter.limit("10/15minutes")
def generate_fitness(request: Request, inp: FitnessInput):
    return StreamingResponse(
        sse_generator(inp),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
