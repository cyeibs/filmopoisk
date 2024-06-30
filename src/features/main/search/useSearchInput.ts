import { ChangeEvent, useState, useEffect } from "react";
import { useFilters } from "../filterBy/useFilters";
import { debounce } from "@/shared/lib/debounce";

export const useSearchInput = () => {
  const { filters, updateFilters } = useFilters();
  const [inputValue, setInputValue] = useState(filters.title || "");

  useEffect(() => {
    setInputValue(filters.title || "");
  }, [filters.title]);

  const debouncedUpdateFilters = debounce((key: string, value: string) => {
    updateFilters(key, value);
  }, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedUpdateFilters("title", value);
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
