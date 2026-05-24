from pydantic import BaseModel, Field
from typing import Literal


class FitnessInput(BaseModel):
    age: int = Field(..., ge=10, le=120)
    weight: float = Field(..., gt=0)
    weight_unit: Literal["kg", "lbs"] = "kg"
    height: float = Field(..., gt=0)
    height_unit: Literal["cm", "ft"] = "cm"
    gender: str
    fitness_goals: list[str] = Field(..., min_length=1)
    activity_level: str
    dietary_preferences: list[str] = []
    health_conditions: str = ""
    dietary_notes: str = ""


class PTInput(BaseModel):
    condition: str = Field(..., min_length=2)
    pain_areas: list[str] = Field(..., min_length=1)
    mobility_limitations: str = ""
    recovery_goals: str = Field(..., min_length=2)
    available_equipment: list[str] = []
    pain_level: int = Field(..., ge=1, le=10)
    recovery_stage: Literal["acute", "sub-acute", "chronic"]
    health_conditions: str = ""
