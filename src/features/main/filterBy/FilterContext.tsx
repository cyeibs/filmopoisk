import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FilterContextProps } from "../lib/types";

export const FilterContext = createContext<FilterContextProps | undefined>(
  undefined
);

export const FilterProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filtersFromUrl: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      filtersFromUrl[key] = value;
    });
    setFilters(filtersFromUrl);
  }, [location.search]);

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });

    const searchParams = new URLSearchParams(location.search);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    history({ search: searchParams.toString() });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
