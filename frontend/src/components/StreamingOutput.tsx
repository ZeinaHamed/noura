import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  output: string;
  isLoading: boolean;
  error: string | null;
}

export function StreamingOutput({ output, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <p className="font-semibold">Error generating program</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!output && !isLoading) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 flex-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full" />
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Your Program</span>
        <div className="h-1 flex-1 bg-gradient-to-r from-accent-500 to-brand-500 rounded-full" />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        <div className="prose prose-gray max-w-none
          prose-headings:text-gray-800 prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
          prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-li:text-gray-700
          prose-strong:text-gray-800
          prose-table:text-sm
          prose-th:bg-gray-50 prose-th:p-2
          prose-td:p-2
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
          {isLoading && (
            <span className="inline-block w-2 h-5 bg-brand-500 animate-pulse ml-0.5 align-middle rounded-sm" />
          )}
        </div>
      </div>
    </div>
  );
}
