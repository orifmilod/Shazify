import styled from "styled-components";
const Button = styled.button`
  padding: 10px 20px;
  color: ${props => (props.color ? props.theme.color[props.color] : "black")};
  border-radius: 5px;
  width: 100%;
  background: ${props => (props.bg ? props.theme.color[props.bg] : "white")};
`;
export default Button;
