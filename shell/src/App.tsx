import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  Outlet
} from 'react-router-dom';
// Chat types may still be needed in other components but not here.
import { CreateView } from './views/CreateView';
import { SideBar } from './features/Sidebar/Component/Sidebar';
import type { NavItem } from './features/Sidebar/types/NavItem';
import useRequireAuth from './features/auth/useRequireAuth';


import { PreviewAreaContainer } from './features/library/views/PreviewAreaContainer';
import { RagRecordsView } from './features/rag/views/RagRecords';
import { AddRagRecords } from './features/rag/views/AddRagRecords';
import { useGetChatIds } from './features/Chat/hooks/useGetChatIds';
import { useDeleteChatHistory } from './features/Chat/hooks/useDeleteChatHistory';
import { LoginView, SignupView } from './features/auth';

// Protected layout that requires authentication
function ProtectedLayout() {
  const location = useLocation();
  const { chatId: chatIdParam } = useParams();
  const navigate = useNavigate();
  useRequireAuth('/auth/login');
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

  // Sidebar is now directly included in the ProtectedLayout

  return (
    <>
      {sidebar}
      <Outlet />
    </>
  );
}

// Public layout for auth pages (no authentication required)
function PublicLayout() {
  return <Outlet />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/auth/login" element={<div className='col-span-3 overflow-auto'><LoginView /></div>} />
        <Route path="/auth/signup" element={<div className='col-span-3 overflow-auto'><SignupView /></div>} />
      </Route>
      
      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/library" element={<div className="col-span-2 overflow-auto"><PreviewAreaContainer /></div>} />
        <Route path="/chat">
          <Route index element={<CreateView />} />
          <Route path=":chatId" element={<CreateView />} />
        </Route>
        <Route path="/rag" element={<div className="col-span-2 overflow-auto"><RagRecordsView /></div>} />
        <Route path="/rag/add" element={<div className='col-span-2 overflow-auto'><AddRagRecords /></div>} />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="grid grid-cols-[256px_1fr_1.5fr] h-screen w-screen select-none overflow-hidden divide-x-3 divide-solid divide-gray-200">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;