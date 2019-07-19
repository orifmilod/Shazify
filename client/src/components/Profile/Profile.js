import React from "react";
import icon from "../../img/person-icon.png";
import Image from "../../common/Image";
import List from "@material-ui/core/List";
import ListItem from "../../common/ListItem";

const Profile = props => {
  const { display_name, email, country, images } = props.userData;
  return (
    <div className="justify-content-center row pt-3">
      <Image lg src={images.length > 0 ? images[0].url : icon} alt="user-pic" />
      <List>
        <ListItem classname="fas fa-user" text={display_name} divider />
        <ListItem classname="fas fa-envelope" text={email} divider />
        <ListItem classname="fas fa-globe-americas" text={country} />
      </List>
    </div>
  );
};

export default Profile;
