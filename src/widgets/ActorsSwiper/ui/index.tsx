import React, { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { useCarousel } from "@/features/carousel/hooks/useCarousel";
import { CarouselButtons } from "@/features/carousel";
import { CarouselProps } from "../lib/types";

export const ActorSwiper: FunctionComponent<CarouselProps> = ({ items }) => {
  const {
    carouselRef,
    showLeftButton,
    showRightButton,
    handleScrollLeft,
    handleScrollRight,
  } = useCarousel(items.length);

  return (
    <div className={styles.carouselContainer}>
      <CarouselButtons
        showLeftButton={showLeftButton}
        showRightButton={showRightButton}
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
      />
      <div className={styles.carousel} ref={carouselRef}>
        {items.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
