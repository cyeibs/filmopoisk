import React, { useState } from "react";
import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Icon } from "../../Icon";
import { useModal } from "@/features/modalOpen/hook";
import { login, selectAuth } from "@/app/RTK/services/authSlice";
import { Loading } from "../../Loading";
import { useAppDispatch, useAppSelector } from "@/app/RTK/store";

export const Modal: FunctionComponent = () => {
  const { isModalOpen, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!isModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        closeModal();
      }
    });
  };
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.label}>Авторизация</div>
          <Icon type="close" onClick={closeModal} className={["cancelIcon"]} />
        </div>
        <form onSubmit={handleLogin} className={styles.modal}>
          <Input
            type="text"
            placeholder="Введите логин"
            label="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Введите пароль"
            label="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <Button className="buttonLogIn">
              <span>Войти</span>
            </Button>
            <Button className="buttonLogOut" onClick={closeModal}>
              <span>Отменить</span>
            </Button>
          </div>
          {auth.isLoading && <Loading />}
          {auth.error && <p className={styles.error}>{auth.error}</p>}
        </form>
      </div>
    </div>,
    document.body
  );
};
