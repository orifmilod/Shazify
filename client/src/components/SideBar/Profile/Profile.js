import React from "react";
import icon from "../../../img/person-icon.png";
import Image from "../../../styled/Image";
import ListItem from "../../../styled/ListItem";
import Grid from "../../../styled/Grid";

const Profile = props => {
  const { display_name, images } = props.userData;
  return (
    <Grid alignItems="row" templateRow="160px 20px" space={3}>
      <Image
        size="xxl"
        src={images && images.length ? images[0].url : icon}
        alt="user-pic"
      />
      <ListItem color="white">{display_name}</ListItem>
    </Grid>
  );
};

export default Profile;
