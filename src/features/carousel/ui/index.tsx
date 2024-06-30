import { FunctionComponent } from "react";
import { Icon } from "@/shared/ui/Icon";
import styles from "./styles.module.css";

type CarouselButtonsProps = {
  showLeftButton: boolean;
  showRightButton: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
};

export const CarouselButtons: FunctionComponent<CarouselButtonsProps> = ({
  showLeftButton,
  showRightButton,
  onScrollLeft,
  onScrollRight,
}) => (
  <>
    {showLeftButton && (
      <div className={styles.leftButton}>
        <Icon onClick={onScrollLeft} type="arrowLeft" />
      </div>
    )}
    {showRightButton && (
      <div className={styles.rightButton}>
        <Icon onClick={onScrollRight} type="arrowRight" />
      </div>
    )}
  </>
);
