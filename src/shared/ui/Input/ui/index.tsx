import { FunctionComponent, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { InputProps } from "../lib/types";

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
      validateTextInput(value);
    } else if (type === "password") {
      validatePasswordInput(value);
    }
  }, [value, type]);

  const validateTextInput = (value: string) => {
    const isValid = /^[a-zA-Z0-9]+$/.test(value);
    setIsError(!isValid);
  };

  const validatePasswordInput = (value: string) => {
    const isValid = value.length >= 6;
    setIsError(!isValid);
  };

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
