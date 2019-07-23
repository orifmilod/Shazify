import styled from "styled-components";

const ListItem = styled.li`
  color: white;
  font-size: ${props => (props.lg ? "24px" : "16px")};
  margin: 10px;
  padding: 10px;
  :hover {
    text-decoration: none;
    color: white;
  }
`;
export default ListItem;
