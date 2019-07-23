import styled from "styled-components";

const P = styled.p`
  color: ${props => (props.secondary ? "gray" : "black")};
  font-size: ${props => (props.font ? props.font : "16px")};
  margin: ${props => (props.padding ? `${props.padding}px` : "0px")};
`;

export default P;
