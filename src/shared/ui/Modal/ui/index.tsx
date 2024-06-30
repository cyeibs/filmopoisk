import { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Icon } from "../../Icon";
import { Loading } from "../../Loading";
import { useModal } from "@/features/modalOpen/hook";
import { useLogin } from "../lib/useLogin";

export const Modal: FunctionComponent = () => {
  const { isModalOpen, closeModal } = useModal();
  const { username, setUsername, password, setPassword, handleLogin, auth } =
    useLogin();

  if (!isModalOpen) return null;

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
