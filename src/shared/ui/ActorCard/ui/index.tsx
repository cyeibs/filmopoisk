import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Actors } from "@/app/RTK/services/types";

export const ActorCard: FunctionComponent<Actors> = ({ name, photo }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.containerIcon}
        loading="lazy"
        alt="poster"
        src={photo}
      />
      <span className={styles.title}>{name}</span>
    </div>
  );
};
