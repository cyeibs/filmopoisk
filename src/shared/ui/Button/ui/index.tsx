import { FunctionComponent } from "react";
import { Icon } from "@/shared/ui/Icon";
import styles from "./styles.module.css";
import { Props } from "../lib/types";

export const Button: FunctionComponent<Props> = ({
  onClick,
  children,
  isLoading,
  disabled,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className ? styles[className] : ""}`}
      onClick={onClick}
    >
      {isLoading ? <Icon type="star" /> : children}
    </button>
  );
};
