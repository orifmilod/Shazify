import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 100% !important;
  color: black;
  font-weight: bold;
  outline-width: 0px;
  background: ${props => (props.bg ? props.theme.color[props.bg] : "white")};
  padding: ${props =>
    props.space ? `${props.space * 4}px` : "0px"} !important;
  margin: ${props =>
    props.margin ? `${props.margin * 4}px` : "0px"} !important;
  font-size: ${props => (props.lg ? "24px" : "16px")};

  ::placeholder {
    color: #c1c1c1;
  }
`;

export default Input;
