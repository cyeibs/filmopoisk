// Select.tsx
import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Icon } from "../../Icon";
import { useSelect } from "../model/useSelect";
import { SelectProps } from "../../SearchInput/lib/types";

export const Select: FunctionComponent<SelectProps> = ({
  data,
  label,
  placeholder,
  initialValue,
  onSelect,
  dropdownKey,
}) => {
  const { isOpen, selectedKey, toggleDropdown, handleSelect } = useSelect(
    initialValue,
    dropdownKey
  );

  return (
    <div className={styles.select}>
      <div className={styles.labelRequired}>
        <div className={styles.label}>{label}</div>
      </div>
      <div
        className={`${styles.input} ${isOpen ? styles.inputActive : ""}`}
        onClick={toggleDropdown}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={`${styles.value} ${selectedKey && styles.valueActive}`}>
          {selectedKey ? data[selectedKey] : placeholder}
        </div>
        <Icon
          type={isOpen ? "arrowUp" : "arrowDown"}
          className={["squareIcon"]}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          <div className={styles.dropdownContainer}>
            {Object.entries(data)
              .sort()
              .map(([key, value]) => (
                <div
                  key={key}
                  className={`${styles.dropdownItem} ${
                    selectedKey === key ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(key, onSelect)}
                  role="option"
                  aria-selected={selectedKey === key}
                >
                  {value}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
