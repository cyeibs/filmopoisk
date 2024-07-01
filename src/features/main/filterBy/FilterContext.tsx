import {
  FunctionComponent,
  ReactNode,
  createContext,
  useCallback,
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
    setFilters((prevFilters) => {
      if (JSON.stringify(prevFilters) !== JSON.stringify(filtersFromUrl)) {
        return filtersFromUrl;
      }
      return prevFilters;
    });
  }, [location.search]);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters((prev) => {
        if (prev[key] !== value) {
          return { ...prev, [key]: value };
        }
        return prev;
      });

      const searchParams = new URLSearchParams(location.search);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });

      if (location.search !== `?${searchParams.toString()}`) {
        history({ search: searchParams.toString() });
      }
    },
    [filters, location.search, history]
  );

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
