import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Rating } from "@/shared/ui/Rating";
import { selectAuth } from "@/app/RTK/services/authSlice";
import { useAppSelector } from "@/app/RTK/store";
import { TicketCardProps } from "../lib/types";

export const TicketCard: FunctionComponent<TicketCardProps> = ({
  id,
  type = "short",
  title,
  description,
  rating,
  poster,
  genre,
  release_year,
  director,
}) => {
  const isFull = type === "full";

  const { token } = useAppSelector(selectAuth);
  const isLoggedIn = !!token;

  return (
    <div
      className={`${styles.ticketCard} ${
        isFull ? styles.ticketCardFull : styles.ticketCardShort
      }`}
    >
      <img
        className={`${styles.containerIcon} ${
          isFull ? styles.containerIconFull : styles.containerIconShort
        }`}
        loading="lazy"
        alt="poster"
        src={poster}
      />
      <section className={`${styles.frameParent} `}>
        <div
          className={`${styles.lableParent} ${
            isFull ? styles.lableParentFull : styles.lableParentShort
          }`}
        >
          <h3
            className={`${styles.title} ${
              isFull ? styles.titleFull : styles.titleShort
            }`}
          >
            {title}
          </h3>
          <div
            className={`${styles.frameGroup} ${
              isFull ? styles.frameGroupFull : styles.frameGroupShort
            }`}
          >
            <div className={styles.lableGroup}>
              <span
                className={`${styles.lable} ${
                  isFull ? styles.labelFull : styles.labelShort
                }`}
              >
                Жанр{isFull && ":"}
              </span>
              <div
                className={`${styles.description} ${
                  isFull ? styles.descriptionFull : styles.descriptionShort
                }`}
              >
                {genre}
              </div>
            </div>
            <div className={styles.lableGroup}>
              <div
                className={`${styles.lable} ${
                  isFull ? styles.labelFull : styles.labelShort
                }`}
              >
                Год выпуска{isFull && ":"}
              </div>
              <span
                className={`${styles.description} ${
                  isFull ? styles.descriptionFull : styles.descriptionShort
                }`}
              >
                {release_year}
              </span>
            </div>
            {isFull && (
              <div className={styles.lableGroup}>
                <div
                  className={`${styles.lable} ${
                    isFull ? styles.labelFull : styles.labelShort
                  }`}
                >
                  Рейтинг{isFull && ":"}
                </div>
                <span
                  className={`${styles.description} ${
                    isFull ? styles.descriptionFull : styles.descriptionShort
                  }`}
                >
                  {rating}
                </span>
              </div>
            )}
            {isFull && (
              <div className={styles.lableGroup}>
                <div
                  className={`${styles.lable} ${
                    isFull ? styles.labelFull : styles.labelShort
                  }`}
                >
                  Режиссер{isFull && ":"}
                </div>
                <span
                  className={`${styles.description} ${
                    isFull ? styles.descriptionFull : styles.descriptionShort
                  }`}
                >
                  {director}
                </span>
              </div>
            )}
            <div
              className={`${
                isFull ? styles.descriptionGroupFull : styles.lableGroup
              }`}
            >
              <span
                className={`${styles.lable} ${
                  isFull ? styles.labelFull : styles.labelShort
                }`}
              >
                Описание
              </span>
              <div
                className={`${styles.description} ${
                  isFull ? styles.info : styles.descriptionShort
                }`}
              >
                {description}
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn && (
          <div className={styles.score}>
            <Rating movieId={id} />
          </div>
        )}
      </section>
    </div>
  );
};
