export type SelectProps = {
  data: { [key: string]: string };
  label: string;
  placeholder: string;
  initialValue?: string;
  onSelect: (key: string) => void;
  dropdownKey?: string;
};
