import styled from "styled-components";

const Image = styled.img`
  height: ${props => (props.lg ? "150px" : "50px")};
  width: ${props => (props.lg ? "150px" : "50px")};
  border-radius: 50%;
`;
export default Image;
