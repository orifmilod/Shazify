import styled from "styled-components";
import getWidthString from "../utils/GetWidth";

const Grid = styled.div`
  background: ${props => (props.bg ? props.theme.color[props.bg] : "none")};

  /* Padding */
  padding-top: ${props => (props.py ? `${props.theme.space[props.py]}` : "0")};
  padding-bottom: ${props =>
    props.py ? `${props.theme.space[props.py]}` : "0"};
  padding-left: ${props =>
    props.px ? ` ${props.theme.space[props.px]}` : "0"};
  padding-right: ${props =>
    props.px ? `${props.theme.space[props.px]}` : "0"};

  /* Margin */
  margin-top: ${props => (props.my ? `${props.theme.size[props.my]}` : "0")};
  margin-bottom: ${props => (props.my ? `${props.theme.size[props.my]}` : "0")};
  margin-left: ${props => (props.mx ? `${props.theme.size[props.mx]}` : "0")};
  margin-right: ${props => (props.mx ? `${props.theme.size[props.mx]}` : "0")};

  /* Display */
  display: grid;
  align-self: auto;
  grid-auto-flow: ${props => props.direction};
  position: ${props => (props.position ? props.position : "relative")};
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justify};
  grid-gap: ${props => (props.space ? props.space : "0")}px;
  grid-template-columns: ${props => props.templateColumn};
  grid-template-rows: ${props => props.templateRow};

  overflow: ${props => (props.overflow ? props.overflow : "initial")};

  /* Height && width */
  height: ${props => (props.height ? props.height : "100%")};

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
