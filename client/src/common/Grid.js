import styled from "styled-components";
import getWidthString from "../utils/GetWidth";

const Grid = styled.div`
  background: ${props => (props.bg ? props.theme.color[props.bg] : "white")};
  margin: auto;
  height: ${props => (props.theme.height ? props.theme.height : "100%")};
  display: grid;
  grid-auto-flow: ${props => props.direction};
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
