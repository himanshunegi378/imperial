import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface HtmlItem {
  id: number;
  name: string;
  html: string;
}

interface PreviewAreaProps {
  htmlContentList: HtmlItem[];
}

export const PreviewArea = ({ htmlContentList }: PreviewAreaProps) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (html: string, id: number) => {
    navigator.clipboard.writeText(html).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-soft-white p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {htmlContentList.length === 0 && (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <p className="text-lg text-light-gray">
              Your generated components will appear here.
            </p>
          </div>
        )}

        {htmlContentList.map(({ id, name, html }) => {
          // The iframe content now uses the theme's base background for a seamless look.
          const iframeContent = `<!DOCTYPE html>
<html>
  <head>
    <title>${name}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
      /* Simple scrollbar styling for a more modern look */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #D1C4E9; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #b3a8d4; }
    </style>
  </head>
  <body class="bg-soft-white text-dark-gray min-h-screen flex items-center justify-center p-4">
    ${html}
  </body>
</html>`;

          return (
            <div
              key={id}
              className="overflow-hidden rounded-xl border border-muted-lavender/50 bg-white shadow-soft-float transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              {/* Card Header: Contains title and copy button */}
              <div className="flex items-center justify-between border-b border-muted-lavender/50 bg-soft-white/50 px-5 py-3">
                <h3 className="font-semibold text-dark-gray">{name}</h3>
                <button
                  onClick={() => handleCopy(html, id)}
                  disabled={copiedId === id}
                  aria-label={copiedId === id ? 'Copied HTML' : 'Copy HTML'}
                  // Enhanced button styling with better states
                  className={`flex items-center gap-x-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-calming-blue focus-visible:ring-offset-2 focus-visible:ring-offset-soft-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
                    copiedId === id
                      ? 'bg-serene-green text-white'
                      : 'bg-pale-aqua/30 text-calming-blue hover:bg-pale-aqua/60'
                  }`}
                >
                  {copiedId === id ? <FaCheck /> : <FaCopy />}
                  <span>{copiedId === id ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Iframe Preview Area */}
              <div className="bg-soft-white">
                <iframe
                  title={name}
                  srcDoc={iframeContent}
                  sandbox="allow-scripts"
                  className="h-96 w-full border-none md:h-[500px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};