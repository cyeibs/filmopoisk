import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Icon } from "@/shared/ui/Icon";
import { RatingProps } from "../lib/types";
import { useRating } from "../lib/useRating";

export const Rating: FunctionComponent<RatingProps> = ({ movieId }) => {
  const { rating, hover, setHover, handleClick, TOTAL_STARS } =
    useRating(movieId);

  return (
    <>
      {[...Array(TOTAL_STARS)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <span
            key={index}
            className={styles.container}
            onClick={(e) => handleClick(currentRating, e)}
          >
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => {}}
              className={styles.starInput}
            />
            <span
              className={styles.star}
              style={{
                cursor: "pointer",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              <Icon
                type={
                  currentRating <= (hover ?? rating ?? 0)
                    ? hover !== null
                      ? "starHover"
                      : "starFilled"
                    : "star"
                }
              />
            </span>
            <span className={styles.index}>{index + 1}</span>
          </span>
        );
      })}
    </>
  );
};
