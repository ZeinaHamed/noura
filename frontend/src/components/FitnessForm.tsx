import { useState } from 'react';
import type { FitnessInput } from '../types/index.js';

const FITNESS_GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance', 'Flexibility', 'Athletic Performance'];
const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', desc: '1–3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', desc: '3–5 days/week' },
  { value: 'very_active', label: 'Very Active', desc: '6–7 days/week' },
  { value: 'extremely_active', label: 'Extremely Active', desc: 'Twice/day or physical job' },
];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat'];

interface Props {
  onSubmit: (input: FitnessInput) => void;
  isLoading: boolean;
}

export function FitnessForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<FitnessInput>({
    age: '' as unknown as number,
    weight: '' as unknown as number,
    weight_unit: 'kg',
    height: '' as unknown as number,
    height_unit: 'cm',
    gender: '',
    fitness_goals: [],
    activity_level: '',
    dietary_preferences: [],
    health_conditions: '',
    dietary_notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.age || form.age < 10 || form.age > 120) e.age = 'Enter a valid age (10–120)';
    if (!form.weight || form.weight <= 0) e.weight = 'Enter a valid weight';
    if (!form.height || form.height <= 0) e.height = 'Enter a valid height';
    if (!form.gender) e.gender = 'Select a gender';
    if (!form.fitness_goals.length) e.fitness_goals = 'Select at least one goal';
    if (!form.activity_level) e.activity_level = 'Select your activity level';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  const fieldClass = (name: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            className={fieldClass('age')}
            value={form.age || ''}
            onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))}
            placeholder="e.g. 28"
          />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
          <div className="flex gap-1">
            <input
              type="number"
              className={`flex-1 px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.weight ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              value={form.weight || ''}
              onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))}
              placeholder="70"
            />
            <select
              className="px-2 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              value={form.weight_unit}
              onChange={e => setForm(f => ({ ...f, weight_unit: e.target.value as 'kg' | 'lbs' }))}
            >
              <option>kg</option>
              <option>lbs</option>
            </select>
          </div>
          {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
          <div className="flex gap-1">
            <input
              type="number"
              className={`flex-1 px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.height ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              value={form.height || ''}
              onChange={e => setForm(f => ({ ...f, height: Number(e.target.value) }))}
              placeholder="170"
            />
            <select
              className="px-2 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              value={form.height_unit}
              onChange={e => setForm(f => ({ ...f, height_unit: e.target.value as 'cm' | 'ft' }))}
            >
              <option>cm</option>
              <option>ft</option>
            </select>
          </div>
          {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            className={fieldClass('gender')}
            value={form.gender}
            onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
          >
            <option value="">Select...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
        </div>
      </div>

      {/* Fitness Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goals</label>
        <div className="flex flex-wrap gap-2">
          {FITNESS_GOALS.map(goal => (
            <button
              key={goal}
              type="button"
              onClick={() => setForm(f => ({ ...f, fitness_goals: toggle(f.fitness_goals, goal) }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                form.fitness_goals.includes(goal)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
        {errors.fitness_goals && <p className="text-xs text-red-500 mt-1">{errors.fitness_goals}</p>}
      </div>

      {/* Activity Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {ACTIVITY_LEVELS.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm(f => ({ ...f, activity_level: value }))}
              className={`p-3 rounded-xl border text-center transition-colors ${
                form.activity_level === value
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
        {errors.activity_level && <p className="text-xs text-red-500 mt-1">{errors.activity_level}</p>}
      </div>

      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences <span className="text-gray-400 font-normal">(optional)</span></label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm(f => ({ ...f, dietary_preferences: toggle(f.dietary_preferences, opt) }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                form.dietary_preferences.includes(opt)
                  ? 'bg-accent-600 text-white border-accent-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-accent-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Health Conditions & Dietary Notes — combined card */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🏥</span>
          <h3 className="text-sm font-semibold text-amber-800">Health Conditions & Dietary Notes</h3>
          <span className="text-xs text-amber-600 font-normal">(optional — helps personalize your plan)</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Health Conditions & Medical History</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-lg border border-amber-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            rows={2}
            placeholder="e.g. Type 2 diabetes, hypertension, hypothyroidism, PCOS, lower back pain, knee replacement, heart disease..."
            value={form.health_conditions}
            onChange={e => setForm(f => ({ ...f, health_conditions: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Dietary Notes</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-lg border border-amber-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            rows={2}
            placeholder="e.g. Allergic to nuts and shellfish, avoid high-sodium foods due to blood pressure, intermittent fasting 16:8, prefer 3 meals no snacks, dislike broccoli and liver..."
            value={form.dietary_notes}
            onChange={e => setForm(f => ({ ...f, dietary_notes: e.target.value }))}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating your program...
          </span>
        ) : (
          'Generate My Program'
        )}
      </button>
    </form>
  );
}
