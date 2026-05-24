import { PTForm } from '../components/PTForm.js';
import { StreamingOutput } from '../components/StreamingOutput.js';
import { useStreamingGenerate } from '../hooks/useStreamingGenerate.js';
import type { PTInput } from '../types/index.js';

export function PhysicalTherapyPage() {
  const { generate, output, isLoading, error, reset } = useStreamingGenerate();

  async function handleSubmit(input: PTInput) {
    reset();
    await generate('/api/generate/pt', input);
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-xl">🩺</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Physical Therapy Program</h1>
            <p className="text-sm text-gray-500">AI-powered personalized rehabilitation and recovery plan</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <PTForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      <StreamingOutput output={output} isLoading={isLoading} error={error} />
    </div>
  );
}
