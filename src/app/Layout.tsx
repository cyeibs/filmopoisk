import { Header } from "@/widgets/Header";
import { FunctionComponent } from "react";
import { ModalProvider } from "@/features/modalOpen";
import { Modal } from "@/shared/ui/Modal";
import styles from "./styles/styles.module.css";
import { Outlet } from "react-router-dom";

export const Layout: FunctionComponent = () => {
  return (
    <ModalProvider>
      <Header />
      <Modal />
      <div className={styles.bodyСontainer}>
        <Outlet />
      </div>
    </ModalProvider>
  );
};
