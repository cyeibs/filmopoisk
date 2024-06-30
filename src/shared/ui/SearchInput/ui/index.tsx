import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Icon } from "../../Icon";
import { useSearchInput } from "@/features/main/search/useSearchInput";

export const SearchInput: FunctionComponent = () => {
  const { inputValue, handleInputChange, handleReset } = useSearchInput();

  return (
    <div className={styles.inputParent}>
      <div className={styles.inputContainer}>
        <Icon type="search" className={["searchIcon"]} />
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Название фильма"
        />
        {inputValue && (
          <Icon type="reset" className={["resetIcon"]} onClick={handleReset} />
        )}
      </div>
    </div>
  );
};
