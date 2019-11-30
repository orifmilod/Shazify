import styled from "styled-components";

const List = styled.li`
  list-style-type: none;
  /* Padding */
  padding-top: ${props => (props.py ? `${props.theme.space[props.py]}` : "0")};
  padding-bottom: ${props =>
    props.py ? `${props.theme.space[props.py]}` : "0"};
  padding-left: ${props =>
    props.px ? ` ${props.theme.space[props.px]}` : "0"};
  padding-right: ${props =>
    props.px ? `${props.theme.space[props.px]}` : "0"};

  /* Margin */
  margin-top: ${props => (props.my ? `${props.theme.size[props.my]}` : "0")};
  margin-bottom: ${props => (props.my ? `${props.theme.size[props.my]}` : "0")};
  margin-left: ${props => (props.mx ? `${props.theme.size[props.mx]}` : "0")};
  margin-right: ${props => (props.mx ? `${props.theme.size[props.mx]}` : "0")};
`;
export default List;
