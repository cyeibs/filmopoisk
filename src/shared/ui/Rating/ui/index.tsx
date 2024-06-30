import { FunctionComponent, useState, useEffect, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/RTK/store";
import { rateMovie } from "@/app/RTK/services/ratingsSlice";
import styles from "./styles.module.css";
import { Icon } from "@/shared/ui/Icon";
import { selectAuth } from "@/app/RTK/services/authSlice";
import { useGetMovieByIdQuery } from "@/app/RTK/services/moviesApi";
import { debounce } from "@/shared/lib/debounce";
import { RatingProps } from "../lib/types";

const TOTAL_STARS = 5;

export const Rating: FunctionComponent<RatingProps> = ({ movieId }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectAuth);
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { refetch } = useGetMovieByIdQuery(movieId);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings") || "{}");
    if (savedRatings[movieId]) {
      setRating(savedRatings[movieId]);
    }
  }, [movieId]);

  const handleRating = (currentRating: number, event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (token) {
      setRating(currentRating);
      dispatch(rateMovie({ movieId, userRate: currentRating })).then(
        (action) => {
          if (rateMovie.fulfilled.match(action)) {
            refetch();
          }
        }
      );
    } else {
      alert("Вы должны быть авторизованы, чтобы поставить оценку");
    }
  };

  const debouncedHandleRating = debounce(handleRating, 300);

  const handleClick = (currentRating: number, event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    debouncedHandleRating(currentRating, event);
  };

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
