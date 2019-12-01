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



const ListItem = styled.li`
  color: ${props => (props.color ? props.color : "black")};
  list-style-type: none;
  text-align: ${props => props.align};
  font-size: ${props => (props.font ? props.font : "16px")};
  padding: ${props => (props.space ? `${props.space * 4}px` : "0px")};

  margin-top: ${props => `${props.my * 4}px`};
  margin-bottom: ${props => `${props.my * 4}px`};

  margin-left: ${props => `${props.mx * 4}px`};
  margin-right: ${props => `${props.mx * 4}px`};

  border-bottom: ${props =>
    props.divide ? `0.5px ${props.divide} solid` : ""};
  :hover {
    text-decoration: none;
    color: ${props => (props.color ? props.color : "black")};
    cursor: default;
  }
`;
List.Item = ListItem;
export default List;
