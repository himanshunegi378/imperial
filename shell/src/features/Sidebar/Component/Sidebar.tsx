// NavButton.tsx
import React from 'react'; // Don't forget to import React

interface NavButtonProps {
  label: React.ReactNode;
  icon: React.ReactNode; // Use React.ReactNode for icons
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const NavButton = ({ label, icon, onClick, isActive, isDisabled }: NavButtonProps) => (
  <li>
    <button
      onClick={onClick}
      disabled={isDisabled}
      // Added `group` for nested hover effects if needed on icon/text
      className={`
        flex items-center w-full p-1.5 rounded-md ease-in-out
        font-sans text-dark-gray 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive
          ? 'bg-gradient-to-r shadow-inner from-pale-aqua to-muted-lavender text-calming-blue shadow-soft-float -ml-1 border-l-4 border-calming-blue'
          : 'bg-soft-white hover:bg-muted-lavender/50 focus:bg-muted-lavender/70 -ml-1 border-l-4 border-transparent' // Subtler hover
        }
         active:shadow-inner // Active state for pressed feel
      `}
      aria-current={isActive ? 'page' : undefined} // A11y for active link
    >
      <span className={`mr-3 ${isActive ? 'text-calming-blue' : 'text-dark-gray group-hover:text-calming-blue'}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  </li>
);

export default NavButton; // Export as default for easier import

// SideBar.tsx
import { FiHelpCircle } from 'react-icons/fi'; // Example icons
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { DropdownMenu } from '../../../shared/components/DropdownMenu';
import type { NavItem } from '../types/NavItem';

export const SideBar = ({ navItems, className, chatHistory, onDeleteChat }: { navItems: NavItem[], className?: string, chatHistory: { chatId: string, name: string, onClick: (chatId: string) => void }[], onDeleteChat?: (chatId: string) => void }) => {
  return (
    <div className={`
      bg-soft-white text-dark-gray flex flex-col px-4 shadow-soft-float
      border-r-2 border-gray-200
      
      ${className}
    `}>
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold text-calming-blue font-sans">
          IMPERIAL
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-grow">
        <ul className="mb-6">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={item.isActive}
              onClick={() => item.onClick(item.id)}
              isDisabled={item.isDisabled}
            />
          ))}
        </ul>

        <div className="mb-2 px-2 text-sm font-medium text-gray-400 select-none">Chats</div>
        <ul className="grow shrink-1 basis-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {chatHistory.map((item, index) => (
            <li key={item.chatId + index} className="relative group">
              <div 
                onClick={() => item.onClick(item.chatId)}
                className="flex items-center justify-between p-1.5 rounded-lg text-gray-800 hover:text-blue-700 hover:bg-blue-100 focus:bg-blue-200 focus:outline-none cursor-pointer"
              >
                <span
                  className="flex-grow text-left overflow-hidden text-ellipsis whitespace-nowrap"
                  title={item.name}
                >
                  {item.name}
                </span>
                <div className="">
                  <DropdownMenu 
                    trigger={<FiMoreVertical className="text-gray-500 group-hover:text-blue-700 " />}
                    align="right"
                    items={[
                      {
                        label: 'Delete',
                        icon: <FiTrash2 className="text-red-500" />,
                        onClick: () => onDeleteChat && onDeleteChat(item.chatId),
                        className: 'text-red-500 hover:text-red-700'
                      }
                    ]}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Button */}
      <div className="border-t border-gray-200"> {/* Add some margin top */}
        <button
          onClick={() => window.open('https://github.com/himanshunegi378/imperial', '_blank')}
          className={`
            w-full py-3 text-center text-light-gray flex items-center justify-center rounded-md
            transition-all duration-200 ease-in-out
            hover:bg-muted-lavender/50 hover:text-calming-blue
            focus:outline-none focus:ring-2 focus:ring-calming-blue focus:ring-offset-2 focus:ring-offset-soft-white
            active:scale-[0.98]
          `}
        >
          <FiHelpCircle className="mr-2 text-xl" /> {/* Example help icon */}
          <span className="font-medium">Help & Support</span>
        </button>
      </div>
    </div>
  );
};