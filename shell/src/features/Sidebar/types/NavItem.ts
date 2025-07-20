export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  isActive?: boolean;
};
