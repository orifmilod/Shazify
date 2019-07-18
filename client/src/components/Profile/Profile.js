import React from "react";
import styled from "styled-components";
import icon from "../../img/person-icon.png";
import Image from "../../common/Image";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Icon = styled.i`
  color: lightgray;
  font-size: 14px;
  padding: 10px;
  background-color: black;
  border-radius: 50%;
  border: 1px solid;
`;
const Profile = props => {
  const { display_name, email, country, images } = props.userData;
  return (
    <div className="justify-content-center row">
      <Image lg src={images.length > 0 ? images[0].url : icon} alt="user-pic" />
      <List>
        <ListItem>
          <ListItemText>
            <Icon className="fas fa-user" />
            {display_name}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <Icon className="fas fa-envelope" /> {email}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>
            <Icon className="fas fa-globe-americas" /> {country}
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default Profile;
