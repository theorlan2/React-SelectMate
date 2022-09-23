import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import  { ThemeProvider } from "styled-components";
// Components
import { ContainerListOptions } from "./SelectMate/ContainerListOptions";
import { ContainerSelectMate } from "./SelectMate/ContainerSelectMate";
import { IconArrow } from "./SelectMate/IconArrow";
import { SelectNative } from "./SelectMate/Select";
import TextSelectOption from "./SelectMate/TextSelectedOption";
// utils
import {
  checkIsNavigatorMovil,
  getChild,
  getFirstChild,
} from "../commons/utils";
import { theme } from "../commons/theme";


type PropsSelectMate = {
  options: { value: any; label: string; selected: boolean }[];
  defaultText?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string | unknown) => void;
};

const SelectMate: FunctionComponent<PropsSelectMate> = (props) => {
  const defaultText = useRef("Select an Option");
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [indexSelected, setIndexSelected] = useState(0);
  const [isMovil, setIsMovil] = useState(false);
  useEffect(() => {
    setIsMovil(checkIsNavigatorMovil());
    createListOptionsFromChild();
  }, []);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [value]);

  function createListOptionsFromChild() {
    // Creating list to display options
    if (Array.isArray(props.children)) {
      const firstChild = getFirstChild(props.children);
      const itemDefault = props.children.find(
        (item: ReactElement<HTMLOptionElement>) =>
          item.props.value === props.defaultValue
      );
      defaultText.current =
        props.defaultValue && props.defaultValue !== "" && itemDefault
          ? itemDefault
          : props.defaultText
          ? props.defaultText
          : getChild(firstChild);
    }
  }

  // Method to select the option
  function selectOption(indx: number, label: string) {
    setIndexSelected(indx);
    defaultText.current = label as string;
  } // fin SelectOption

  // Method to open the Select
  function openSelect() {
    if (!isMovil) {
      setIsActive(!isActive);
    }
  }

  // Method to close the Select
  function closeSelect() {
    setIsActive(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSelectMate
        className={`${props.className}`}
        role='select-mate'
        data-selec-open={isActive}
        onClick={openSelect}
      >
        <SelectNative
          indexSelected={indexSelected}
          isMovil={isMovil}
          isActive={isActive}
          defaultValue={props.defaultValue || value}
          onChange={(value: any) => {
            setValue(value);
            closeSelect();
          }}
          options={props.options}
        />
        <TextSelectOption>
          {defaultText.current ? defaultText.current : props.defaultText}
        </TextSelectOption>

        <IconArrow isActive={isActive} />
        <ContainerListOptions
          selectOption={(indx, label) => selectOption(indx, label)}
          options={props.options}
          isActive={isActive}
        ></ContainerListOptions>
      </ContainerSelectMate>
    </ThemeProvider>
  );
};

export default SelectMate;
