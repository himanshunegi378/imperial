import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface HtmlItem {
  id: number;
  name: string;
  html: string;
}

interface PreviewAreaItemProps {
  item: HtmlItem;
}

export const PreviewAreaItem = ({ item }: PreviewAreaItemProps) => {
  const { name, html } = item;
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const iframeContent = `<!DOCTYPE html>
<html>
  <head>
    <title>${name}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
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
    <div className="overflow-hidden rounded-xl border border-muted-lavender/50 bg-white shadow-soft-float transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-between border-b border-muted-lavender/50 bg-soft-white/50 px-5 py-3">
        <h3 className="font-semibold text-dark-gray">{name}</h3>
        <button
          onClick={handleCopy}
          disabled={isCopied}
          aria-label={isCopied ? 'Copied HTML' : 'Copy HTML'}
          className={`flex items-center gap-x-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-calming-blue focus-visible:ring-offset-2 focus-visible:ring-offset-soft-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
            isCopied
              ? 'bg-serene-green text-white'
              : 'bg-pale-aqua/30 text-calming-blue hover:bg-pale-aqua/60'
          }`}
        >
          {isCopied ? <FaCheck /> : <FaCopy />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
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
};

interface PreviewAreaProps {
  htmlContentList: HtmlItem[];
}

export const PreviewArea = ({ htmlContentList }: PreviewAreaProps) => {
  if (htmlContentList.length === 0) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center bg-soft-white p-4 sm:p-6 md:p-8">
        <p className="text-lg text-light-gray">
          Your generated components will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-soft-white p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {htmlContentList.map((item) => (
          <PreviewAreaItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};