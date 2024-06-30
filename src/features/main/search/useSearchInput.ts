import { ChangeEvent, useState, useEffect, useCallback, useRef } from "react";
import { useFilters } from "../filterBy/useFilters";
import { debounce } from "@/shared/lib/debounce";

export const useSearchInput = () => {
  const { filters, updateFilters } = useFilters();
  const [inputValue, setInputValue] = useState(filters.title || "");

  const debouncedUpdateFilters = useRef(
    debounce((value: string) => {
      updateFilters("title", value);
    }, 300)
  ).current;

  useEffect(() => {
    setInputValue(filters.title || "");
  }, [filters.title]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedUpdateFilters(value);
  };

  const handleReset = () => {
    setInputValue("");
    updateFilters("title", "");
  };

  return {
    inputValue,
    handleInputChange,
    handleReset,
  };
};
