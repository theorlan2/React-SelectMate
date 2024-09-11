import styled from "styled-components";

type Props = {
  "data-active": boolean;
};

const ContainerIconArrow = styled.span<Props>`
    position: absolute;
    top: 20px;
    right: 2%;
    font-size: 16px;
    height: 22px;
    transition: all 275ms;
    transform: ${(props) => (props["data-active"] ? "rotate(180deg)" : "rotate(0deg)")};
  }`;

export const IconArrow = ({ isActive }: { isActive: boolean }) => {
  return (
    <ContainerIconArrow data-active={isActive}>
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
        <path d="M0-.75h24v24H0z" fill="none" />
      </svg>
    </ContainerIconArrow>
  );
};
