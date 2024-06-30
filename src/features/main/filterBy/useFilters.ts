import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("провайдера не хватает");
  }
  return context;
};
