import { FunctionComponent, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { InputProps } from "../lib/types";
import { validateTextInput, validatePasswordInput } from "../lib/validation";

export const Input: FunctionComponent<InputProps> = ({
  type,
  placeholder,
  label,
  value,
  onChange,
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (type === "text") {
      setIsError(!validateTextInput(value));
    } else if (type === "password") {
      setIsError(!validatePasswordInput(value));
    }
  }, [value, type]);

  return (
    <div className={styles.inputParent}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${isError ? styles.error : ""}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
