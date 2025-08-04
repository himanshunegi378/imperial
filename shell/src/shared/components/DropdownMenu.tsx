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
  maxHeight?: number;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
  stopPropagation = true,
  maxHeight = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  }>({});

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

  useEffect(() => {
    if (isOpen && dropdownRef.current && menuRef.current) {
      const calculatePosition = () => {
        const triggerRect = dropdownRef.current?.getBoundingClientRect();
        const menuRect = menuRef.current?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        if (!triggerRect || !menuRect) return;
        
        // Default position
        let newPosition: {
          top?: number | string;
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
        } = {};
        
        // Vertical positioning
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const menuHeight = Math.min(menuRect.height, maxHeight);
        
        if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
          // Not enough space below, but more space above
          newPosition.bottom = `${window.innerHeight - triggerRect.top}px`;
        } else {
          // Enough space below or not enough space above
          newPosition.top = '100%';
        }
        
        // Horizontal positioning
        if (align === 'right') {
          if (triggerRect.right - menuRect.width < 0) {
            // Not enough space to the left when right-aligned
            newPosition.left = '0';
            newPosition.right = 'auto';
          } else {
            newPosition.right = '0';
          }
        } else { // align === 'left'
          if (triggerRect.left + menuRect.width > viewportWidth) {
            // Not enough space to the right when left-aligned
            newPosition.right = '0';
            newPosition.left = 'auto';
          } else {
            newPosition.left = '0';
          }
        }
        
        setPosition(newPosition);
      };
      
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen, align, maxHeight]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 w-48 rounded-[0.75rem] bg-white focus:outline-none border-2 border-gray-200`}
          style={{
            ...position,
            maxHeight: `${maxHeight}px`,
            overflowY: 'auto',
          }}
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
