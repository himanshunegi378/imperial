import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
// Chat types may still be needed in other components but not here.
import { CreateView } from './views/CreateView';
import { SideBar } from './features/Sidebar/Component/Sidebar';
import type { NavItem } from './features/Sidebar/types/NavItem';
import useSessionId from './api-hooks/useSessionId';

import { PreviewAreaContainer } from './features/library/views/PreviewAreaContainer';
import { RagRecordsView } from './features/rag/views/RagRecords';
import { AddRagRecords } from './features/rag/views/AddRagRecords';
import { useGetChatIds } from './features/Chat/hooks/useGetChatIds';
import { useDeleteChatHistory } from './features/Chat/hooks/useDeleteChatHistory';
import { LoginView, SignupView } from './features/auth';

function Layout() {
  const location = useLocation();
  const { chatId: chatIdParam } = useParams();
  const navigate = useNavigate();
  const { data: chatIds } = useGetChatIds();

  const { mutateAsync: deleteChatId } = useDeleteChatHistory();

  const navItems: NavItem[] = [
    {
      id: 'create',
      label: 'Create',
      icon: '📝',
      onClick: () => navigate('/chat'),
      isActive: location.pathname === '/chat',
    },
    {
      id: 'library',
      label: (
        <span className="inline-flex items-center text-base">
          Library
        </span>
      ),
      icon: '🖼️',
      onClick: () => navigate('/library'),
      isActive: location.pathname === '/library',
    },
    {
      id: 'rag',
      label: (
        <span className="inline-flex items-center text-base">
          RAG Records
        </span>
      ),
      icon: '📊',
      onClick: () => navigate('/rag'),
      isActive: location.pathname === '/rag',
    },
    {
      id: 'add-rag',
      label: (
        <span className="inline-flex items-center text-base">
          Add RAG Records
        </span>
      ),
      icon: '➕',
      onClick: () => navigate('/rag/add'),
      isActive: location.pathname === '/rag/add',
    },
  ];

  const handleDeleteChat = async (chatId: string) => {
    await deleteChatId({ chatId });
    if (chatIdParam === chatId) {
      navigate('/chat');
    }
  }

  const sidebar = <SideBar
    navItems={navItems}
    chatHistory={chatIds?.map((chatId) => ({ chatId: chatId.chatId, name: chatId.name, onClick: () => { navigate(`/chat/${chatId.chatId}`) } })) ?? []}
    onDeleteChat={handleDeleteChat}
  />

  const withSidebar = (element: React.ReactNode) => (
    <div className="grid grid-cols-[256px_1fr_1.5fr] h-screen w-screen select-none overflow-hidden divide-x-3 divide-solid divide-gray-200">
      {sidebar}
      {element}
    </div>
  )

  return (
    <Routes>
        <Route path="/library" element={withSidebar(<div className="col-span-2 overflow-auto"><PreviewAreaContainer /></div>)} />
        <Route path="/chat">
          <Route index element={withSidebar(<CreateView />)} />
          <Route path=":chatId" element={withSidebar(<CreateView />)} />
        </Route>
        <Route path="/rag" element={withSidebar(<div className="col-span-2 overflow-auto"><RagRecordsView /></div>)} />
        <Route path="/rag/add" element={withSidebar(<div className='col-span-2 overflow-auto'><AddRagRecords /></div>)} />
        <Route path="/auth/login" element={<div className='col-span-2 overflow-auto'><LoginView /></div>} />
        <Route path="/auth/signup" element={<div className='col-span-2 overflow-auto'><SignupView /></div>} />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
  );
}

function App() {
  // Session init
  useSessionId();

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;