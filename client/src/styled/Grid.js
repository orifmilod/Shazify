import styled from "styled-components";
import getWidthString from "../utils/GetWidth";

const Grid = styled.div`
  background: ${props => (props.bg ? props.theme.color[props.bg] : "")};

  /* Padding */
  padding-top: ${props => `${props.theme.space[props.py]}`};
  padding-bottom: ${props => `${props.theme.space[props.py]}`};
  padding-left: ${props => `${props.theme.space[props.px]}`};
  padding-right: ${props => `${props.theme.space[props.px]}`};

  /* Margin */
  margin-top: ${props => `${props.theme.space[props.my]}`};
  margin-bottom: ${props => `${props.theme.space[props.my]}`};
  margin-left: ${props => `${props.theme.space[props.mx]}`};
  margin-right: ${props => `${props.theme.space[props.mx]}`};

  /* Display */
  display: grid;
  align-self: auto;
  grid-auto-flow: ${props => props.direction};
  position: ${props => (props.position ? props.position : "relative")};
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justify};
  grid-gap: ${props => props.space}px;
  grid-template-columns: ${props => props.templateColumn};
  grid-template-rows: ${props => props.templateRow};

  overflow: ${props => (props.overflow ? props.overflow : "initial")};

  /* Height && width */
  height: ${props => (props.height ? props.height : "")};

  ${({ xs }) => (xs ? getWidthString(xs) : "")};

  @media screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }

  @media screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }

  @media screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;
export default Grid;
