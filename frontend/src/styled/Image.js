import styled from "styled-components";

const Image = styled.img`
  height: ${props => (props.size ? props.theme.size[props.size] : "100%")};
  width: ${props => (props.size ? props.theme.size[props.size] : "100%")};
  margin: auto;
  border-radius: 50%;
`;
export default Image;
