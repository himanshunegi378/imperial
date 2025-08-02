import React, { useState, useRef, useEffect } from 'react';

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
  className?: string;
  stopPropagation?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
  stopPropagation = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e: React.MouseEvent, onClick: () => void) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1 w-48 rounded-[0.75rem] bg-white focus:outline-none border-2 border-gray-200 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={(e) => handleItemClick(e, item.onClick)}
                className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${item.className || ''}`}
                role="menuitem"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
