export interface FilterContextProps {
  filters: Record<string, string>;
  updateFilters: (key: string, value: string) => void;
}

export type SelectFilterProps = {
  data: { [key: string]: string };
  label: string;
  filterKey: string;
  placeholder: string;
  initialValue?: string;
};
