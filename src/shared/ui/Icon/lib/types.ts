import { MouseEvent } from "react";

export type IconType =
  | "star"
  | "starFilled"
  | "starHover"
  | "close"
  | "profile"
  | "next"
  | "prev"
  | "search"
  | "cancelRound"
  | "arrowDown"
  | "arrowUp"
  | "reset"
  | "arrowRight"
  | "arrowLeft";

export type Props = {
  className?: (string | false | null | undefined)[];
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  type: IconType;
};
