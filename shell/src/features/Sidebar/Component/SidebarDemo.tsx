import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { NavItem } from '../types/NavItem';
import { FiHome, FiMessageSquare, FiBookOpen, FiSearch, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { Button } from '../../../components/ui/button';

export const SidebarDemo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('home');

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <FiHome className="h-4 w-4" />,
      onClick: (id) => setCurrentRoute(id),
      isActive: currentRoute === 'home',
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: <FiMessageSquare className="h-4 w-4" />,
      onClick: (id) => setCurrentRoute(id),
      isActive: currentRoute === 'chat',
    },
    {
      id: 'library',
      label: 'Library',
      icon: <FiBookOpen className="h-4 w-4" />,
      onClick: (id) => setCurrentRoute(id),
      isActive: currentRoute === 'library',
    },
    {
      id: 'search',
      label: 'Search',
      icon: <FiSearch className="h-4 w-4" />,
      onClick: (id) => setCurrentRoute(id),
      isActive: currentRoute === 'search',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FiSettings className="h-4 w-4" />,
      onClick: (id) => setCurrentRoute(id),
      isActive: currentRoute === 'settings',
    },
  ];

  const chatHistory = [
    { chatId: '1', name: 'Project Discussion', onClick: (id: string) => setCurrentRoute(`chat-${id}`) },
    { chatId: '2', name: 'Design Review', onClick: (id: string) => setCurrentRoute(`chat-${id}`) },
    { chatId: '3', name: 'Code Review', onClick: (id: string) => setCurrentRoute(`chat-${id}`) },
    { chatId: '4', name: 'Meeting Notes', onClick: (id: string) => setCurrentRoute(`chat-${id}`) },
  ];

  const handleDeleteChat = (chatId: string) => {
    console.log('Deleting chat:', chatId);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        navItems={navItems}
        chatHistory={chatHistory}
        onDeleteChat={handleDeleteChat}
        collapsed={collapsed}
      />
      
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Sidebar Demo</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center space-x-2"
          >
            {collapsed ? <FiMenu className="h-4 w-4" /> : <FiX className="h-4 w-4" />}
            <span>{collapsed ? 'Expand' : 'Collapse'}</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Current Route: {currentRoute}</h2>
            <p className="text-muted-foreground">
              Click on navigation items to see the active state change. 
              The sidebar can be collapsed to save space and show tooltips on hover.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="text-md font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Responsive design with collapsible functionality</li>
              <li>Modern shadcn/ui components</li>
              <li>Proper accessibility with ARIA labels</li>
              <li>Smooth transitions and hover effects</li>
              <li>Chat history with delete functionality</li>
              <li>User account dropdown with logout</li>
              <li>Tooltips for collapsed state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
