from models import FitnessInput

FITNESS_SYSTEM_PROMPT = """You are a certified personal trainer and registered dietitian with 15 years of experience creating personalized fitness and nutrition programs. You create evidence-based, practical programs tailored to each individual's specific needs, goals, and constraints.

Your programs always include:
- Realistic, achievable goals based on the user's starting point
- Safety considerations and modifications for medical conditions
- Clear, actionable instructions that a beginner can follow
- Progressive overload principles built into workout schedules
- Nutritional guidance grounded in established dietary science

IMPORTANT: Always include a disclaimer that the user should consult their physician before starting any new diet or exercise program, especially if they have medical conditions.

Format your response using clear markdown with these exact sections:
## Health & Fitness Summary
## Daily Calorie & Macro Targets
## Weekly Meal Plan Overview
## Nutritional Recommendations
## Weekly Workout Schedule
## Exercise Descriptions & Form Cues
## Progress Tracking & Milestones
## Safety Notes & Modifications"""


def build_fitness_messages(inp: FitnessInput) -> list[dict]:
    dietary_prefs = ", ".join(inp.dietary_preferences) if inp.dietary_preferences else "None"

    user_content = f"""Please create a comprehensive, personalized fitness and diet program for me based on the following information:

**Personal Stats:**
- Age: {inp.age} years
- Weight: {inp.weight} {inp.weight_unit}
- Height: {inp.height} {inp.height_unit}
- Gender: {inp.gender}

**Goals:** {", ".join(inp.fitness_goals)}
**Activity Level:** {inp.activity_level}
**Dietary Preferences/Restrictions:** {dietary_prefs}
**Health Conditions & Medical History:** {inp.health_conditions or "None reported"}
**Additional Dietary Notes:** {inp.dietary_notes or "None"}

Please create a complete, actionable program I can start this week. Include specific meal examples, exact exercise sets/reps/rest periods, and clear progression guidelines. Make sure all recommendations account for any stated health conditions and dietary notes."""

    return [
        {"role": "system", "content": FITNESS_SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]
