import { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";

export const ContainerOptions = styled.div`
  position: relative;
  float: left;
  width: 100%;
`;

export const ULListOptions = styled.ul`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 999;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 0px;
  width: 100%;
  background-color: #fff;
  padding: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
  border-radius: 0px 0px 3px 3px;
  box-shadow: 1px 4px 10px -2px rgba(0, 0, 0, 0.2);
  transition: all 375ms ease-in-out;
  .active {
    background-color: $bacgroundOptionActive;
  }
`;

type OptionProps = {
  selected: boolean;
  className: string;
};

const OptionElement = styled.li<OptionProps>`
  width: 100%;
  background-color: ${(props) => props.theme.bacgroundOption};
  list-style-type: none;
  padding: 10px 2%;
  margin: 0px;
  display: block;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: all 275ms ease-in-out;

  &:last-child {
    border-radius: 3px;
    border-bottom: 0px;
  }
  &:hover {
    background-color: ${(props) => props.theme.bacgroundOptionActive};
  }
  
`;

type ContainerListOptionsProps = {
  isActive: boolean;
  options: { value: any; label: string; selected: boolean }[];
  indexSelect: number;
  selectOption: (indx: number, selectNumber: number) => void;
};

export const ContainerListOptions: FunctionComponent<
  ContainerListOptionsProps
> = (props) => {
  useEffect(() => {
    if (props.isActive) {
      getHeightOfElements();
    } else {
      heightUl.current = 0;
    }
  }, [props.isActive]);

  const UlRef = useRef(null as unknown as HTMLUListElement);
  const heightUl = useRef(0);

  // Method to open the Select
  function getHeightOfElements() {
    const ulWhitLiElements =
      //@ts-ignore
      UlRef.current && (UlRef.current.children as NodeListOf<HTMLLIElement>);
    let _heightUl = 0;

    if (ulWhitLiElements) {
      for (let i = 0; i < ulWhitLiElements.length; i++) {
        _heightUl += ulWhitLiElements[i].offsetHeight;
      }
    }
    heightUl.current = _heightUl;
  }

  function selectOption(indx: number, selectNumber: number) {  
    props.selectOption(indx, selectNumber);
  } // fin SelectOption

  return (
    <ContainerOptions>
      <ULListOptions ref={UlRef} style={{ height: heightUl.current }}>
        {Array.isArray(props.options) &&
          props.options.map((item, i) => (
            <OptionElement
              key={`${i}-list-item`}
              data-index={props.indexSelect}
              data-selec-index={props.indexSelect}
              selected={props.options[i].selected}
              className={props.options[i].selected === true ? "active" : ""}
              onClick={() => selectOption(i, props.indexSelect)}
            >
              {props.options[i].label}
            </OptionElement>
          ))}
      </ULListOptions>
    </ContainerOptions>
  );
};
