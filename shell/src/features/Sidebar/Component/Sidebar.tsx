import React from 'react';
import { FiMoreVertical, FiTrash2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../auth/hooks/useCurrentUser';
import { useAuth } from '../../auth/useAuth';
import type { NavItem } from '../types/NavItem';

// Import shadcn/ui components
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Separator } from '../../../components/ui/separator';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { Badge } from '../../../components/ui/badge';

interface NavButtonProps {
  label: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  showLabel?: boolean;
}

const NavButton = ({ label, icon, onClick, isActive, isDisabled, showLabel = true }: NavButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          onClick={onClick}
          disabled={isDisabled}
          className={`
            w-full justify-start h-10 px-3
            ${isActive 
              ? 'bg-secondary text-secondary-foreground shadow-sm border border-border' 
              : 'hover:bg-accent hover:text-accent-foreground'
            }
            transition-all duration-200 ease-in-out
            ${!showLabel ? 'px-3' : 'px-4'}
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className={`${isActive ? 'text-primary' : 'text-muted-foreground'} ${showLabel ? 'mr-3' : ''}`}>
            {icon}
          </span>
          {showLabel && (
            <span className="truncate font-medium font-sans text-sm tracking-wide">{label}</span>
          )}
        </Button>
      </TooltipTrigger>
             {!showLabel && (
         <TooltipContent side="right" className="ml-2">
           <p className="font-sans text-sm">{label}</p>
         </TooltipContent>
       )}
    </Tooltip>
  </TooltipProvider>
);

interface ChatHistoryItemProps {
  chatId: string;
  name: string;
  onClick: (chatId: string) => void;
  onDelete?: (chatId: string) => void;
  isActive?: boolean;
}

const ChatHistoryItem = ({ chatId, name, onClick, onDelete, isActive }: ChatHistoryItemProps) => (
  <div className="group relative">
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      onClick={() => onClick(chatId)}
      className={`
        w-full justify-between h-9 px-3
        ${isActive 
          ? 'bg-secondary text-secondary-foreground shadow-sm border border-border' 
          : 'hover:bg-accent hover:text-accent-foreground'
        }
        transition-all duration-200 ease-in-out
      `}
    >
      <span className="truncate text-left flex-1 mr-2 text-sm font-sans font-medium">{name}</span>
      {onDelete && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <FiMoreVertical className="h-3 w-3" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
                         <DropdownMenuItem
               onClick={(e) => {
                 e.stopPropagation();
                 onDelete(chatId);
               }}
               className="text-destructive focus:text-destructive font-sans"
             >
               <FiTrash2 className="mr-2 h-4 w-4" />
               Delete chat
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Button>
  </div>
);

interface SidebarProps {
  navItems: NavItem[];
  className?: string;
  chatHistory: { chatId: string; name: string; onClick: (chatId: string) => void }[];
  onDeleteChat?: (chatId: string) => void;
  collapsed?: boolean;
}

export const Sidebar = ({ 
  navItems, 
  className, 
  chatHistory, 
  onDeleteChat,
  collapsed = false 
}: SidebarProps) => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout().then(() => {
      navigate('/login', { replace: true });
    });
  };

  return (
    <div className={`
      flex flex-col h-full bg-background border-r border-border
      ${collapsed ? 'w-16' : 'w-64'}
      transition-all duration-300 ease-in-out
      ${className}
    `}>
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-display">I</span>
          </div>
          {!collapsed && (
            <h1 className="text-xl font-semibold text-foreground font-display tracking-wide">
              IMPERIAL
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {/* Main Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavButton
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={item.isActive}
                  onClick={() => item.onClick(item.id)}
                  isDisabled={item.isDisabled}
                  showLabel={!collapsed}
                />
              ))}
            </nav>

            {/* Chat History Section */}
            {chatHistory.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && (
                                           <h3 className="text-sm font-medium text-muted-foreground font-sans tracking-wide">
                       Recent Chats
                     </h3>
                    )}
                    {!collapsed && (
                                           <Badge variant="secondary" className="text-xs font-medium font-sans">
                       {chatHistory.length}
                     </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {chatHistory.map((item, index) => (
                      <ChatHistoryItem
                        key={`${item.chatId}-${index}`}
                        chatId={item.chatId}
                        name={item.name}
                        onClick={item.onClick}
                        onDelete={onDeleteChat}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* User Account */}
      <div className="border-t border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`
                w-full justify-start h-10 px-3
                ${collapsed ? 'px-2' : 'px-3'}
              `}
            >
                             <Avatar className="h-6 w-6 mr-2">
                 <AvatarFallback className="text-xs font-semibold font-sans">
                   {user?.email?.charAt(0).toUpperCase() || 'U'}
                 </AvatarFallback>
               </Avatar>
               {!collapsed && (
                 <div className="flex-1 text-left">
                   <p className="text-sm font-medium text-foreground truncate font-sans tracking-wide">
                     {user?.email || 'Account'}
                   </p>
                   <p className="text-xs text-muted-foreground truncate font-sans font-normal">
                     User
                   </p>
                 </div>
               )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
                         <div className="flex items-center justify-start space-x-2 p-2">
               <Avatar className="h-8 w-8">
                                <AvatarFallback className="font-semibold font-sans">
                 {user?.email?.charAt(0).toUpperCase() || 'U'}
               </AvatarFallback>
               </Avatar>
               <div className="space-y-1">
                 <p className="text-sm font-medium leading-none font-sans tracking-wide">
                   {user?.email || 'Account'}
                 </p>
                 <p className="text-xs leading-none text-muted-foreground font-sans font-normal">
                   User
                 </p>
               </div>
             </div>
            <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive font-sans">
               <FiLogOut className="mr-2 h-4 w-4" />
               Log out
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};