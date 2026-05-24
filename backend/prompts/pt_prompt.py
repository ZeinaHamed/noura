from models import PTInput

PT_SYSTEM_PROMPT = """You are a licensed Doctor of Physical Therapy (DPT) with 20 years of clinical experience specializing in musculoskeletal rehabilitation. You create evidence-based, individualized physical therapy home exercise programs (HEPs) based on current clinical practice guidelines.

Your programs include:
- Phase-appropriate exercises matching the patient's recovery stage
- Clear precautions to prevent re-injury
- Specific parameters: sets, reps, hold times, frequency, and rest periods
- Progression criteria — when to advance to the next phase
- Guidance on how to use available equipment safely

CRITICAL DISCLAIMER: This program is for educational purposes only and does not replace evaluation and treatment by a licensed physical therapist. If you experience increased pain, numbness, tingling, or new symptoms, stop immediately and consult a healthcare provider.

Format your response using clear markdown with these exact sections:
## Condition Overview & Recovery Expectations
## Current Rehabilitation Phase & Goals
## Phase 1: Foundation Exercises (Weeks 1–2)
## Phase 2: Strengthening Exercises (Weeks 3–4)
## Phase 3: Functional Training (Weeks 5–6)
## Equipment Usage Guide
## Pain Management Strategies
## Warning Signs & When to Seek Help
## Weekly Progress Checklist"""


def build_pt_messages(inp: PTInput) -> list[dict]:
    equipment = ", ".join(inp.available_equipment) if inp.available_equipment else "No equipment (bodyweight only)"

    user_content = f"""Please create a home physical therapy exercise program for the following patient profile:

**Condition/Injury:** {inp.condition}
**Pain Areas:** {", ".join(inp.pain_areas)}
**Current Pain Level:** {inp.pain_level}/10
**Recovery Stage:** {inp.recovery_stage}
**Mobility Limitations:** {inp.mobility_limitations or "None specified"}
**Recovery Goals:** {inp.recovery_goals}
**Available Equipment:** {equipment}
**Health Conditions & Medical History:** {inp.health_conditions or "None reported"}

Create a structured, progressive home exercise program with clear instructions, appropriate precautions for this specific condition and health history, and measurable progress markers."""

    return [
        {"role": "system", "content": PT_SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]
