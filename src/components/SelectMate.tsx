import { FunctionComponent, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
// Components
import { ContainerListOptions } from "./SelectMate/ContainerListOptions";
import { ContainerSelectMate } from "./SelectMate/ContainerSelectMate";
import { IconArrow } from "./SelectMate/IconArrow";
import { SelectNative } from "./SelectMate/Select";
import TextSelectOption from "./SelectMate/TextSelectedOption";

import { theme } from "../commons/theme";
import { useGetDefaultOption } from "./hooks/useGetDefaultOption";
import { OptionI } from "../types/select";

type PropsSelectMate = {
  options: OptionI[];
  defaultText?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string | unknown) => void;
};

const SelectMate: FunctionComponent<PropsSelectMate> = (props) => {
  const idSelectedString = "select-mate-selected-option";
  const { value: defaultText, setValue: setDefaultText } = useGetDefaultOption(
    props.children,
    props.options,
    props.defaultValue,
    props.defaultText,
  );
  const [isActive, setIsActive] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);

  const selectUID = "853f02jBYSd5uGnGpkFV";

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if ((event.srcElement as any).id === idSelectedString) {
        setIsActive(!isActive);
      } else {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  function selectOption(indx: number, label: string) {
    setIndexSelected(indx);
    setDefaultText(label);
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSelectMate
        className={`${props.className}`}
        role="select-mate"
        data-selec-open={isActive}
      >
        <SelectNative
          uid={selectUID}
          indexSelected={indexSelected}
          defaultValue={props.defaultValue}
          onChange={(label: string, indx: number) => {
            selectOption(indx, label);
          }}
          options={props.options}
        />
        <TextSelectOption id={idSelectedString}>{defaultText}</TextSelectOption>
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
