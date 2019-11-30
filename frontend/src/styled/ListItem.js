import styled from "styled-components";

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
export default ListItem;
