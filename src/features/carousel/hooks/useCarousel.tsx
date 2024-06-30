import { useRef, useState, useEffect } from "react";

export const useCarousel = (itemsCount: number) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 160, behavior: "smooth" });
      updateButtonsVisibility();
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -160, behavior: "smooth" });
      updateButtonsVisibility();
    }
  };

  const updateButtonsVisibility = () => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setShowLeftButton(carouselRef.current.scrollLeft > 0);
      setShowRightButton(carouselRef.current.scrollLeft < maxScrollLeft);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateButtonsVisibility);
      updateButtonsVisibility(); // initial check

      return () => {
        carousel.removeEventListener("scroll", updateButtonsVisibility);
      };
    }
  }, [itemsCount]);

  return {
    carouselRef,
    showLeftButton,
    showRightButton,
    handleScrollLeft,
    handleScrollRight,
  };
};
