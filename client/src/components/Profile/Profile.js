import React from 'react';
import styled from 'styled-components';
import icon from '../../img/person-icon.png';

const ListItem = styled.ul`
  font-size: 16px;
  margin-bottom: 10px;
  letter-spacing: 1.3;
`;

const ProfileImage = styled.img`
  height: ${props => (props.large ? '150px' : '50px')};
  width: ${props => (props.large ? '150px' : '50px')};
  border-radius: 50%;
  box-shadow: 0px 13px 26px 1px rgba(37, 97, 0, 1);
  border: solid lightgray;
`;

const Icon = styled.i`
  color: lightgray;
  margin: 0 10px 0 0;
  font-size: 26px;
  padding: 10px;
  background-color: black;
  border-radius: 50%;
  border: 2px solid;
`;
const Profile = props => {
  const { display_name, email, country, images } = props.userData;

  return (
    <div className="justify-content-center row pt-3">
      <ProfileImage
        large
        src={images.length > 0 ? images[0].url : icon}
        alt="user-pic"
      />

      <ul className="pt-5">
        <ListItem>
          <Icon className="fas fa-user" /> {display_name}
        </ListItem>
        <ListItem>
          <Icon className="fas fa-envelope" /> {email}
        </ListItem>
        <ListItem>
          <Icon className="fas fa-globe-americas" /> {country}
        </ListItem>
      </ul>
    </div>
  );
};

export default Profile;
