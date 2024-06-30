import { MouseEvent, ReactNode } from "react";

export type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type?: "submit";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};
