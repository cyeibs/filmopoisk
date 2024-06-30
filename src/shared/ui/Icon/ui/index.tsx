import { FunctionComponent } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import { Props } from "../lib/types";

export const Icon: FunctionComponent<Props> = ({
  className = [],
  onClick,
  type,
}) => {
  const combinedClassName = classNames(
    className.map((cls) => cls && styles[cls])
  );

  return (
    <div className={combinedClassName} onClick={onClick}>
      <img alt="" src={`/images/${type}.svg`} />
    </div>
  );
};
