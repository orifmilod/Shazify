import React from "react";
import icon from "../../img/person-icon.png";
import Image from "../../common/Image";
import ListItem from "../../common/ListItem";

const Profile = props => {
  const { display_name, images } = props.userData;
  return (
    <div className="mt-3">
      <Image lg src={images.length > 0 ? images[0].url : icon} alt="user-pic" />
      <ul>
        <ListItem divide>
          <i className="fas fa-user mr-2" />
          {display_name}
        </ListItem>
        {/* <ListItem className="fas fa-envelope" text={email} divider />
        <ListItem className="fas fa-globe-americas" text={country} /> */}
      </ul>
    </div>
  );
};

export default Profile;
