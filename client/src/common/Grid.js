import styled from "styled-components";
import getWidthString from "../utils/GetWidth";

const Grid = styled.div`
  background: ${props => (props.bg ? props.theme.color[props.bg] : "")};
  padding: ${props => (props.space ? `${props.space * 4}px` : "0px")};
  margin: ${props => (props.margin ? `${props.margin * 4}px` : "0px")};
  height: ${props => (props.height ? props.height : "100%")};
  overflow: ${props => (props.overflow ? props.overflow : "initial")};
  display: grid;
  grid-auto-flow: ${props => props.direction};
  position: ${props => (props.position ? props.position : "relative")};
  align-items: ${props => props.alignItems};
  align-self: auto;
  justify-content: ${props => props.justify};
  grid-gap: ${props => props.space}px;
  grid-template-columns: ${props => props.templateColumn};
  grid-template-rows: ${props => props.templateRow};

  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};
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
