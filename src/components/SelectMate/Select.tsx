import { ChangeEvent, FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";

export const Select = styled.select`
  position: absolute;
  overflow: hidden;
  height: 0px;
  opacity: 0;
  z-index: -1;
`;

type Props = {
  isMovil: boolean;
  isActive: boolean;
  defaultValue: string | undefined;
  options: { value: any; label: string; selected: boolean }[];
  onChangeEvent?: (event: ChangeEvent<{ selectedIndex: number }>) => void;
  onChange: (value: any) => void;
};

export const SelectNative: FunctionComponent<Props> = (props) => {
  const selectRef = useRef(null as unknown as HTMLSelectElement);

  //
  function changeEvent(event: ChangeEvent<{ selectedIndex: number }>) {
    if (event && event.target) {
      let indx = event.target.selectedIndex;
      changeOption(indx);
    }
  }

  // Method to change the selected option when changing in mobile
  function changeOption(index: number) {
    if (props.isMovil) {
      //selc = selc -1;
    }
    const select_optiones = selectRef.current && selectRef.current.options;
    select_optiones[index].selected = true;
    props.onChange(select_optiones[index].value);
  }

  function openSelectOnMovil() {
    if (props.isMovil) {
      if (window.document.createEvent) {
        // All
        const evt = window.document.createEvent("MouseEvents");
        evt.initMouseEvent(
          "mousedown",
          false,
          true,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        selectRef.current.dispatchEvent(evt);
        // @ts-ignore
      } else if (selectRef.current.fireEvent) {
        // IE
        // @ts-ignore
        selectRef.current.fireEvent("onmousedown");
      }
    }
  }

  useEffect(() => {
    openSelectOnMovil();
  }, [props.isActive]);

  return (
    <Select
      ref={selectRef}
      defaultValue={props.defaultValue}
      onChange={(evento: ChangeEvent<{ selectedIndex: number }>) =>
        changeEvent(evento)
      }
    >
      {props.options.map((_option, indx) => (
        <option key={`option-${indx}`} value={_option.value}>
          {_option.label}
        </option>
      ))}
    </Select>
  );
};
