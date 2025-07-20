import { useEffect, useRef, useState } from 'react';
import type { Message } from './features/Chat/types';
import { ChatArea } from './features/Chat/Components/ChatArea';
import { SideBar } from './features/Sidebar/Component/Sidebar';
import type { NavItem } from './features/Sidebar/types/NavItem';
import useSessionId from './api-hooks/useSessionId';
import { useChat } from './api-hooks/useChat';





// ## 3. Preview Area Component
// =================================================

// 1. Import desired icons from the library
import { FaCopy, FaCheck } from 'react-icons/fa';

// A subtle spinner that uses the theme's accent color.
const LoadingSpinner = () => (
  <div
    className="h-10 w-10 animate-spin rounded-full border-4 border-muted-lavender border-t-calming-blue"
    role="status"
    aria-label="Loading..."
  />
);

const PreviewArea = ({ htmlContent, isLoading, className }: { htmlContent: string, isLoading: boolean, className?: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // The iframeContent string remains the same...

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };


  useEffect(() => {
    const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Preview</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body class="p-4 bg-white text-gray-900 h-screen flex items-center justify-center">
        ${htmlContent}
      </body>
    </html>`
    if (iframeRef.current) {
      iframeRef.current.srcdoc = iframeContent;
    }
  }, [htmlContent]);

  return (
    <div className={`relative bg-soft-white rounded-xl shadow-soft-float overflow-hidden ${className} `}>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-soft-white/50 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          disabled={isCopied}
          aria-label={isCopied ? "Copied HTML" : "Copy HTML"}
          className={`cursor-pointer flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
            ${isCopied
              ? 'bg-serene-green/80 text-white'
              : 'bg-white/60 text-dark-gray backdrop-blur-sm hover:bg-white/90 shadow-soft-float'
            } `}
        >
          {/* 2. Use the imported icons directly */}
          {isCopied ? <FaCheck /> : <FaCopy />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>




      <iframe
        ref={iframeRef}
        title="AI Generated Preview"
        className={`w-full h-full border-none transition-opacity duration-300 ${isLoading ? 'opacity-20' : 'opacity-100'}`
        }
        sandbox="allow-scripts"
      />
    </div >
  );
};

// ## 4. Main App Component with State Management
// =================================================

function App() {
  useSessionId();
  // State Management
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const { isPending, mutateAsync: chat } = useChat()
  const [htmlContent, setHtmlContent] = useState('<h1>Welcome!</h1><p>Your generated HTML preview will appear here.</p>');
  const [activeNavId, setActiveNavId] = useState('create');
  const [chatId, setChatId] = useState();

  // Data Flow and Handlers
  const handleNavClick = (id: string) => {
    setActiveNavId(id);
    // Add logic here for routing or view changes
    console.log(`Navigating to: ${id}`);
  };

  const handleSendMessage = async (text: string) => {
    if (isPending) return;
    // 1. Add user message to state & set loading
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    const { component, message, chatId: newChatId } = await chat({
      message: text,
      chatId
    })
    setHtmlContent(component)
    const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: message };
    setMessages(prev => [...prev, aiMessage]);
    setChatId(newChatId)

  };

  // Sidebar navigation items configuration
  const navItems: NavItem[] = [
    { id: 'create', label: 'Create', icon: '📝', onClick: handleNavClick, isActive: activeNavId === 'create' },
    {
      id: 'library', label: <span className="inline-flex items-center text-base font-semibold">
        Library
        <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          Coming Soon
        </span>
      </span>,
      icon: '🖼️',
      onClick: handleNavClick,
      isActive: activeNavId === 'library',
      isDisabled: true
    },
  ];

  return (
    <>
      {/* Use the flexible grid layout from the technical design */}
      <div className='grid grid-cols-[256px_1fr_1.5fr] h-screen w-screen overflow-hidden divide-x-3 divide-solid divide-gray-200'>
        <SideBar navItems={navItems} />
        <ChatArea messages={messages} onSendMessage={handleSendMessage} isSending={isPending} />
        <PreviewArea htmlContent={htmlContent} isLoading={isPending} />
      </div>
    </>
  );
}

export default App;