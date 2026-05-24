import { FitnessForm } from '../components/FitnessForm.js';
import { StreamingOutput } from '../components/StreamingOutput.js';
import { useStreamingGenerate } from '../hooks/useStreamingGenerate.js';
import type { FitnessInput } from '../types/index.js';

export function FitnessPage() {
  const { generate, output, isLoading, error, reset } = useStreamingGenerate();

  async function handleSubmit(input: FitnessInput) {
    reset();
    await generate('/api/generate/fitness', input);
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-xl">🏋️</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Diet & Fitness Program</h1>
            <p className="text-sm text-gray-500">AI-powered personalized nutrition and workout plan</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <FitnessForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      <StreamingOutput output={output} isLoading={isLoading} error={error} />
    </div>
  );
}
