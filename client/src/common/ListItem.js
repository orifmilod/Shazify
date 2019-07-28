import styled from "styled-components";

const ListItem = styled.li`
  color: white;
  font-size: ${props => (props.lg ? "24px" : "16px")};
  padding: ${props => (props.space ? `${props.space * 4}px` : "0px")};
  margin: ${props => (props.margin ? `${props.margin * 4}px` : "0px")};
  :hover {
    text-decoration: none;
    color: white;
  }
`;
export default ListItem;
