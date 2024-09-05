export type SelectI = {};

export type OptionI<V = any> = {
  value: V;
  label: string;
  selected?: boolean;
};
