import { OptionI } from "./select";

export type ContainerListOptionsProps = {
  isActive: boolean;
  options: OptionI[];
  selectOption: (indx: number, label: string) => void;
};
