import { useState } from 'react';
import type { PTInput } from '../types/index.js';

const PAIN_AREA_OPTIONS = [
  'Lower Back', 'Upper Back', 'Neck', 'Left Shoulder', 'Right Shoulder',
  'Left Knee', 'Right Knee', 'Left Hip', 'Right Hip', 'Left Ankle', 'Right Ankle',
  'Left Wrist', 'Right Wrist', 'Left Elbow', 'Right Elbow', 'Core / Abdomen',
];

const EQUIPMENT_OPTIONS = [
  'Resistance Bands', 'Foam Roller', 'Theraband', 'Exercise Ball', 'TENS Unit',
  'Ice/Heat Pack', 'Balance Board', 'Massage Gun', 'Pull-up Bar', 'Dumbbells',
  'Yoga Mat', 'Crutches / Walker',
];

const RECOVERY_STAGES = [
  { value: 'acute', label: 'Acute', desc: 'First 0–2 weeks, sharp pain' },
  { value: 'sub-acute', label: 'Sub-Acute', desc: '2–6 weeks, improving' },
  { value: 'chronic', label: 'Chronic / Maintenance', desc: '6+ weeks, ongoing rehab' },
];

const PAIN_COLORS = ['bg-green-500','bg-green-400','bg-lime-400','bg-yellow-400','bg-yellow-500','bg-orange-400','bg-orange-500','bg-red-400','bg-red-500','bg-red-600'];

interface Props {
  onSubmit: (input: PTInput) => void;
  isLoading: boolean;
}

export function PTForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState<PTInput>({
    condition: '',
    pain_areas: [],
    mobility_limitations: '',
    recovery_goals: '',
    available_equipment: [],
    pain_level: 5,
    recovery_stage: '',
    health_conditions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggle<T>(arr: T[], item: T): T[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.condition.trim()) e.condition = 'Describe your condition or injury';
    if (!form.pain_areas.length) e.pain_areas = 'Select at least one pain area';
    if (!form.recovery_goals.trim()) e.recovery_goals = 'Describe your recovery goals';
    if (!form.recovery_stage) e.recovery_stage = 'Select your recovery stage';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  const fieldClass = (name: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 transition-shadow ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Condition or Injury</label>
        <input
          type="text"
          className={fieldClass('condition')}
          value={form.condition}
          onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
          placeholder="e.g. ACL tear, lower back herniated disc, rotator cuff injury, knee osteoarthritis..."
        />
        {errors.condition && <p className="text-xs text-red-500 mt-1">{errors.condition}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pain Areas</label>
        <div className="flex flex-wrap gap-2">
          {PAIN_AREA_OPTIONS.map(area => (
            <button
              key={area}
              type="button"
              onClick={() => setForm(f => ({ ...f, pain_areas: toggle(f.pain_areas, area) }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                form.pain_areas.includes(area)
                  ? 'bg-accent-600 text-white border-accent-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-accent-400'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
        {errors.pain_areas && <p className="text-xs text-red-500 mt-1">{errors.pain_areas}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Pain Level: <span className="font-bold text-gray-900">{form.pain_level}/10</span>
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-green-600 font-medium whitespace-nowrap">No pain</span>
          <div className="flex-1">
            <input
              type="range"
              min={1}
              max={10}
              value={form.pain_level}
              onChange={e => setForm(f => ({ ...f, pain_level: Number(e.target.value) }))}
              className="w-full h-2 appearance-none rounded-full cursor-pointer"
              style={{ background: 'linear-gradient(to right, #22c55e, #eab308, #ef4444)' }}
            />
            <div className="flex justify-between mt-1">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <span key={n} className={`text-xs w-4 text-center ${n === form.pain_level ? 'font-bold text-gray-800' : 'text-gray-400'}`}>{n}</span>
              ))}
            </div>
          </div>
          <span className="text-xs text-red-600 font-medium whitespace-nowrap">Severe</span>
        </div>
        <div className="mt-2 flex justify-center">
          <span className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${PAIN_COLORS[form.pain_level - 1]}`}>
            {form.pain_level <= 3 ? 'Mild' : form.pain_level <= 6 ? 'Moderate' : 'Severe'}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Stage</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RECOVERY_STAGES.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm(f => ({ ...f, recovery_stage: value }))}
              className={`p-3 rounded-xl border text-center transition-colors ${
                form.recovery_stage === value
                  ? 'bg-accent-50 border-accent-500 text-accent-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            </button>
          ))}
        </div>
        {errors.recovery_stage && <p className="text-xs text-red-500 mt-1">{errors.recovery_stage}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobility Limitations <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
          rows={2}
          placeholder="e.g. Cannot bend knee past 90°, limited shoulder abduction, difficulty walking more than 10 minutes..."
          value={form.mobility_limitations}
          onChange={e => setForm(f => ({ ...f, mobility_limitations: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Goals</label>
        <textarea
          className={fieldClass('recovery_goals')}
          rows={2}
          placeholder="e.g. Return to jogging in 3 months, reduce morning stiffness, get back to work without pain..."
          value={form.recovery_goals}
          onChange={e => setForm(f => ({ ...f, recovery_goals: e.target.value }))}
        />
        {errors.recovery_goals && <p className="text-xs text-red-500 mt-1">{errors.recovery_goals}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Equipment <span className="text-gray-400 font-normal">(optional)</span></label>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_OPTIONS.map(eq => (
            <button
              key={eq}
              type="button"
              onClick={() => setForm(f => ({ ...f, available_equipment: toggle(f.available_equipment, eq) }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                form.available_equipment.includes(eq)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
              }`}
            >
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* Health Conditions */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🏥</span>
          <h3 className="text-sm font-semibold text-amber-800">Health Conditions & Medical History</h3>
          <span className="text-xs text-amber-600 font-normal">(optional)</span>
        </div>
        <textarea
          className="w-full px-3 py-2.5 rounded-lg border border-amber-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          rows={2}
          placeholder="e.g. Osteoporosis, diabetes, cardiovascular disease, blood thinners, previous surgeries, allergies to latex or materials..."
          value={form.health_conditions}
          onChange={e => setForm(f => ({ ...f, health_conditions: e.target.value }))}
        />
        <p className="text-xs text-amber-700 mt-2">This helps tailor exercises to be safe given your full medical picture.</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
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
          'Generate My PT Program'
        )}
      </button>
    </form>
  );
}
