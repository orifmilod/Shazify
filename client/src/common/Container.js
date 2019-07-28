import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: ${props => (props.space ? `${props.space * 4}px` : "0px")} !important;
  background: ${props => props.theme.color[props.bg]};
  text-align: center;
  justify-self: center;
`;
export default Container;
