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
        flex items-center w-full p-2 rounded-md transition-all duration-200 ease-in-out
        font-sans text-dark-gray text-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive
          ? 'bg-gradient-to-r from-pale-aqua to-muted-lavender text-calming-blue shadow-soft-float border-l-4 border-calming-blue'
          : 'bg-soft-white hover:bg-muted-lavender/50 focus:bg-muted-lavender/70' // Subtler hover
        }
        focus:outline-none focus:ring-2 focus:ring-calming-blue focus:ring-offset-2 focus:ring-offset-soft-white // Clear focus ring
        active:scale-[0.98] active:bg-pale-aqua active:shadow-inner // Active state for pressed feel
      `}
      aria-current={isActive ? 'page' : undefined} // A11y for active link
    >
      <span className={`mr-3 text-2xl ${isActive ? 'text-calming-blue' : 'text-dark-gray group-hover:text-calming-blue'}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  </li>
);

export default NavButton; // Export as default for easier import

// SideBar.tsx
import { FiHelpCircle } from 'react-icons/fi'; // Example icons
import type { NavItem } from '../types/NavItem';

export const SideBar = ({ navItems, className }: { navItems: NavItem[], className?: string }) => {
  return (
    <div className={`
      bg-soft-white text-dark-gray flex flex-col p-6 shadow-soft-float
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
      <nav className="flex-grow">
        <ul className="space-y-3">
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
      </nav>

      {/* Help Button */}
      <div className="mt-8"> {/* Add some margin top */}
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