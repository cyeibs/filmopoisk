import { useState, useEffect, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/RTK/store";
import { rateMovie } from "@/app/RTK/services/ratingsSlice";
import { selectAuth } from "@/app/RTK/services/authSlice";
import { useGetMovieByIdQuery } from "@/app/RTK/services/moviesApi";
import { debounce } from "@/shared/lib/debounce";

const TOTAL_STARS = 5;

export const useRating = (movieId: string, isMoviePage: boolean) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectAuth);
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { refetch } = useGetMovieByIdQuery(movieId, { skip: !isMoviePage });

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
          if (rateMovie.fulfilled.match(action) && isMoviePage) {
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

  return {
    rating,
    hover,
    setHover,
    handleClick,
    TOTAL_STARS,
  };
};
