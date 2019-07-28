import styled from "styled-components";

const P = styled.p`
  align-self: center;
  color: ${props => (props.secondary ? "gray" : "white")};
  font-size: ${props => (props.font ? props.theme.font[props.font] : "16px")};
  margin: ${props => (props.padding ? `${props.padding}px` : "0px")};
`;

export default P;
