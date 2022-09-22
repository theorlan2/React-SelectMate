import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import {
  checkIsNavigatorMovil,
  getChild,
  getFirstChild,
} from "../commons/utils";
import { theme } from "../theme";
import { ContainerListOptions } from "./SelectMate/ContainerListOptions";
import { ContainerSelectMate } from "./SelectMate/ContainerSelectMate";
import { IconArrow } from "./SelectMate/IconArrow";
import { SelectNative } from "./SelectMate/Select";

let cont = 0;
type PropsSelectMate = {
  options: { value: any; label: string; selected: boolean }[];
  defaultText?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string | unknown) => void;
};

const SelectMate: FunctionComponent<PropsSelectMate> = (props) => {
  const defaultText = useRef("Seleccioná una Opcion");
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(null as unknown);
  const [indexSelect, setIndexSelect] = useState(0);
  const [isMovil, setIsMovil] = useState(false);

  useEffect(() => {
    cont = cont + 1;
    setIndexSelect(cont);
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
  function selectOption(indx: number, selectNumber: number) {
    if (isMovil) {
      selectNumber = selectNumber - 1;
    }
    const select_optiones = document.querySelectorAll(
      "[data-indx-select='" + indexSelect + "']  > select > option"
    ) as NodeListOf<HTMLOptionElement>;

    select_optiones[indx].selected = true;
    setIsActive(false);
    defaultText.current = select_optiones[indx].textContent as string;
    setValue(select_optiones[indx].value);
    closeSelect();
  } // fin SelectOption

  // Method to open the Select
  function openSelect() {
   if(!isMovil) {
      if (isActive === false) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }

  // Method to close the Select
  function closeSelect() {
    setIsActive(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSelectMate
        className={props.className}
        data-indx-select={indexSelect}
        data-selec-open={isActive}
        onClick={openSelect}
      >
        <SelectNative
          isMovil={isMovil}
          isActive={isActive}
          defaultValue={props.defaultValue}
          onChange={(value: any) => setValue(value)}
          options={props.options}
        />
        <p className="select_opcion">
          {defaultText.current ? defaultText.current : props.defaultText}
        </p>

        <IconArrow isActive={isActive} />
        <ContainerListOptions
          selectOption={(indx, _indexSelect) =>
            selectOption(indx, _indexSelect)
          }
          indexSelect={indexSelect}
          options={props.options}
          isActive={isActive}
        ></ContainerListOptions>
      </ContainerSelectMate>
    </ThemeProvider>
  );
};

export default SelectMate;
