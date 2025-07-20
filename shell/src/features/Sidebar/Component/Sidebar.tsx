
import type { NavItem } from "../types/NavItem";


const NavButton = ({ label, icon, onClick, isActive }: Omit<NavItem, 'id' | 'onClick'> & { onClick: () => void }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  </li>
);

export const SideBar = ({ navItems, className }: { navItems: NavItem[], className?: string }) => {
  return (
    <div className={`bg-gray-800 text-white flex flex-col p-4 ${className}`}>
      {/* Logo */}
      <div className="mb-8">
        <img src="https://via.placeholder.com/150/2563EB/FFFFFF?text=Logo" alt="App Logo" className="h-10 w-auto rounded-md" />
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={item.isActive}
              onClick={() => item.onClick(item.id)}
            />
          ))}
        </ul>
      </nav>

      {/* Help Button */}
      <div>
        <button className="w-full py-3 text-center text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200">
          Help
        </button>
      </div>
    </div>
  );
};