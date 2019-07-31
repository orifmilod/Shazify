import React from "react";
import icon from "../../img/person-icon.png";
import Image from "../../common/Image";
import ListItem from "../../common/ListItem";
import Grid from "../../common/Grid";

const Profile = props => {
  const { display_name, images } = props.userData;
  return (
    <Grid alignItems="row" templateRow="150px 20px">
      <Image
        size="xxl"
        src={images.length > 0 ? images[0].url : icon}
        alt="user-pic"
      />
      <ListItem color="white">{display_name}</ListItem>
    </Grid>
  );
};

export default Profile;
