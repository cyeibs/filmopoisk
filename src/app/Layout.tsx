import { Header } from "@/widgets/Header";
import { FunctionComponent } from "react";
import { ModalProvider } from "@/features/modalOpen";
import { Modal } from "@/shared/ui/Modal";
import styles from "./styles/styles.module.css";
import { Outlet } from "react-router-dom";
import { FilterProvider } from "@/features/main/filterBy/FilterContext";
import { DropdownProvider } from "@/shared/ui/Select/model/DropdownContext";

export const Layout: FunctionComponent = () => {
  return (
    <ModalProvider>
      <FilterProvider>
        <DropdownProvider>
          <Header />
          <Modal />
          <div className={styles.bodyСontainer}>
            <Outlet />
          </div>
        </DropdownProvider>
      </FilterProvider>
    </ModalProvider>
  );
};
