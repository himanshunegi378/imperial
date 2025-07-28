import type { ReactNode } from "react";

export type NavItem = {
  id: string;
  label: ReactNode;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  isActive?: boolean;
  isDisabled?: boolean;
};
