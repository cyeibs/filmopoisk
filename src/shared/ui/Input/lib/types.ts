import { ChangeEvent } from "react";

export type InputProps = {
  type: "text" | "password";
  placeholder: string;
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
