import { FunctionComponent } from "react";
import styles from "./styles.module.css";

export const EmptyWarn: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Фильмы не найдены</span>
      <span className={styles.secondary}>
        Измените запрос и попробуйте снова
      </span>
    </div>
  );
};
