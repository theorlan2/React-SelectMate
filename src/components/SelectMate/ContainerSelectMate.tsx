import styled from "styled-components";

type Props = {};

export const ContainerSelectMate = styled.button<Props>`
  border: none;
  text-align: left;
  position: relative;
  float: left;
  min-width: 300px;
  width: 320px;
  min-height: 60px;
  font-family: "Roboto";
  color: ${(props) => props.theme.colorText};
  font-weight: 300;
  background-color: ${(props) => props.theme.bacgroundSelect};
  box-shadow: 1px 2px 6px -2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  transition: all 375ms ease-in-out;
  cursor: pointer;
`;
