import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";
import { useModal } from "@/features/modalOpen/hook";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, selectAuth } from "@/app/RTK/services/authSlice";
import { useAppDispatch } from "@/app/RTK/store";

export const Header: FunctionComponent = () => {
  const { openModal } = useModal();
  const { token } = useSelector(selectAuth);
  const isLoggedIn = !!token;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <span className={styles.headerTitle}>Фильмопоиск</span>
        </Link>

        {isLoggedIn ? (
          <div className={styles.frameParent}>
            <Icon type="profile" className={["iconspersonWrapper"]} />
            <Button className="buttonLogOut" onClick={handleLogout}>
              <span>Выйти</span>
            </Button>
          </div>
        ) : (
          <Button className="buttonLogIn" onClick={openModal}>
            <span>Войти</span>
          </Button>
        )}
      </div>
    </div>
  );
};
