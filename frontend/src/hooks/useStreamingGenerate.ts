import { useState, useCallback } from 'react';
import { API_BASE } from '../lib/api.js';

interface UseStreamingGenerateResult {
  generate: (endpoint: string, input: unknown) => Promise<void>;
  output: string;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useStreamingGenerate(): UseStreamingGenerateResult {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setOutput('');
    setError(null);
    setIsLoading(false);
  }, []);

  const generate = useCallback(async (endpoint: string, input: unknown) => {
    setOutput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const data = await response.json() as { detail?: string; error?: string };
        throw new Error(data.detail ?? data.error ?? `Request failed with status ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') return;

          try {
            const parsed = JSON.parse(raw) as { text?: string; error?: string };
            if (parsed.error) {
              setError(parsed.error);
              return;
            }
            if (parsed.text) {
              setOutput(prev => prev + parsed.text);
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generate, output, isLoading, error, reset };
}
