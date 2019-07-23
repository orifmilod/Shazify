import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.theme.color[props.bg]};
  text-align: center;
  justify-self: center;
`;
export default Container;
