import styled from "styled-components";

const P = styled.p`
  align-self: center;
  text-align: ${props => props.align};
  color: ${props => (props.secondary ? "gray" : props.color)};
  font-size: ${props => (props.font ? props.theme.font[props.font] : "16px")};

  margin-top: ${props => `${props.my * 4}px`};
  margin-bottom: ${props => `${props.my * 4}px`};

  margin-left: ${props => `${props.mx * 4}px`};
  margin-right: ${props => `${props.mx * 4}px`};
`;

export default P;
