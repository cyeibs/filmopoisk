export const validateTextInput = (value: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(value);
};

export const validatePasswordInput = (value: string): boolean => {
  return value.length >= 6;
};
