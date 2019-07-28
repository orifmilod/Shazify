import styled from "styled-components";

const Image = styled.img`
  height: ${props => (props.size ? props.theme.size[props.size] : "50px")};
  width: ${props => (props.size ? props.theme.size[props.size] : "50px")};
  border-radius: 50%;
`;
export default Image;
