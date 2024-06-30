import { FunctionComponent } from "react";
import { Select } from "@/shared/ui/Select";
import { useFilters } from "./useFilters";
import { SelectFilterProps } from "../lib/types";

export const SelectFilter: FunctionComponent<SelectFilterProps> = ({
  data,
  label,
  filterKey,
  placeholder,
  initialValue,
}) => {
  const { updateFilters } = useFilters();

  const handleSelect = (value: string) => {
    updateFilters(filterKey, value);
  };

  return (
    <Select
      data={data}
      label={label}
      placeholder={placeholder}
      initialValue={initialValue}
      onSelect={handleSelect}
    />
  );
};
