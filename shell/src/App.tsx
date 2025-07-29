import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
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

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: chatIds, isLoading } = useGetChatIds();

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

  return (
    <div className="grid grid-cols-[256px_1fr_1.5fr] h-screen w-screen overflow-hidden divide-x-3 divide-solid divide-gray-200">
      <SideBar navItems={navItems} chatHistory={chatIds?.map((chatId) => ({ chatId: chatId.chatId, name: chatId.name, onClick: () => { navigate(`/chat/${chatId.chatId}`) } })) ?? []} />
      <Routes>
        <Route path="/library" element={<div className="col-span-2 overflow-auto"><PreviewAreaContainer /></div>} />
        <Route path="/chat">
          <Route index element={<CreateView />} />
          <Route path=":chatId" element={<CreateView />} />
        </Route>
        <Route path="/rag" element={<div className="col-span-2 overflow-auto"><RagRecordsView /></div>} />
        <Route path="/rag/add" element={<div className='col-span-2 overflow-auto'><AddRagRecords /></div>} />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </div>
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