import { useEffect, useRef, useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

// LoadingSpinner is shown when the generation is pending
const LoadingSpinner = () => (
  <div
    className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary"
    role="status"
    aria-label="Loading..."
  />
);

interface PreviewAreaProps {
  htmlContent: string;
  isLoading: boolean;
  className?: string;
}

/**
 * PreviewArea renders the generated HTML inside an iframe so that Tailwind styles
 * do not collide with the parent document. Provides a copy-to-clipboard button.
 */
export const PreviewArea = ({ htmlContent, isLoading, className }: PreviewAreaProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const iframeContent = `<!DOCTYPE html><html><head><title>Preview</title><script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script></head><body class=\"p-4 bg-white text-gray-900 h-screen flex items-center justify-center flex-col\">${htmlContent}</body></html>`;
    if (iframeRef.current) iframeRef.current.srcdoc = iframeContent;
  }, [htmlContent]);

  return (
    <div className={`relative bg-muted rounded-xl shadow-md overflow-hidden flex-shrink-0 ${className ?? ''}`}>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          disabled={isCopied}
          aria-label={isCopied ? 'Copied HTML' : 'Copy HTML'}
          className={`cursor-pointer flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${isCopied ? 'bg-green-500/80 text-white' : 'bg-background/60 text-foreground backdrop-blur-sm hover:bg-background/90 shadow-md'}`}
        >
          {isCopied ? <FaCheck /> : <FaCopy />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <iframe
        ref={iframeRef}
        title="AI Generated Preview"
        className={`w-full h-full border-none transition-opacity duration-300 ${isLoading ? 'opacity-20' : 'opacity-100'}`}
        sandbox="allow-scripts"
      />
    </div>
  );
};
