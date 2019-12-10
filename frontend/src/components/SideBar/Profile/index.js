import React from "react";
import styled from 'styled-components';
import icon from "../../../img/person-icon.png";
import { List, Grid } from "../../../styled";


const UserIcon = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
  margin: auto;
`
export default function Profile({ userData }) {
  const { display_name, images } = userData;
  return (
    <Grid alignItems="row" templateRow="160px 20px" space={3}>
      <UserIcon src={images && images.length > 0 ? images[0].url : icon} alt="user-pic" />
      <List.Item color="white">{display_name}</List.Item>
    </Grid>
  );
}
