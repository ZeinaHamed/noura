import os
from groq import Groq
from models import FitnessInput, PTInput
from prompts.fitness_prompt import build_fitness_messages
from prompts.pt_prompt import build_pt_messages

MODEL = "llama-3.3-70b-versatile"


def _client() -> Groq:
    return Groq(api_key=os.environ["GROQ_API_KEY"])


def stream_fitness_program(inp: FitnessInput):
    messages = build_fitness_messages(inp)
    stream = _client().chat.completions.create(
        model=MODEL,
        messages=messages,
        max_tokens=4096,
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield delta


def stream_pt_program(inp: PTInput):
    messages = build_pt_messages(inp)
    stream = _client().chat.completions.create(
        model=MODEL,
        messages=messages,
        max_tokens=4096,
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield delta
