import { FunctionComponent } from "react";
import styles from "./styles.module.css";

export const Loading: FunctionComponent = () => {
  return (
    <div className={styles.loadingContainer}>
      <img
        src={"./images/spinner.svg"}
        alt="Loading..."
        className={styles.spinner}
      />
    </div>
  );
};
