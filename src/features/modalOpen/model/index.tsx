import { createContext, useState, FunctionComponent, ReactNode } from "react";
import { ModalContextType } from "../lib/types";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
