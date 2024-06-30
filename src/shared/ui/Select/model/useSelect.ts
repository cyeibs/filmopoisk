import { useState, useEffect } from "react";

export const useSelect = (initialValue?: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(
    initialValue || null
  );

  useEffect(() => {
    if (initialValue) {
      setSelectedKey(initialValue);
    }
  }, [initialValue]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (key: string, onSelect: (key: string) => void) => {
    setSelectedKey(key);
    onSelect(key);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedKey,
    toggleDropdown,
    handleSelect,
  };
};
