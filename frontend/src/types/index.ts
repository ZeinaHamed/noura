export interface FitnessInput {
  age: number;
  weight: number;
  weight_unit: 'kg' | 'lbs';
  height: number;
  height_unit: 'cm' | 'ft';
  gender: string;
  fitness_goals: string[];
  activity_level: string;
  dietary_preferences: string[];
  health_conditions: string;
  dietary_notes: string;
}

export interface PTInput {
  condition: string;
  pain_areas: string[];
  mobility_limitations: string;
  recovery_goals: string;
  available_equipment: string[];
  pain_level: number;
  recovery_stage: string;
  health_conditions: string;
}
