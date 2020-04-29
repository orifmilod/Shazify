import React from 'react'
import styled from 'styled-components'
import icon from '../../../img/person-icon.png'
import { List, Grid } from '../../../styled'
import { useSelector } from 'react-redux'

const UserIcon = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
  margin: auto;
`
export default function Profile() {
  const userData = useSelector((state) => state.userData)
  const { display_name, images, email } = userData

  return (
    <Grid alignItems="row" templateRow="120px 20px 15px" space={3}>
      <UserIcon
        src={images && images.length > 0 ? images[0].url : icon}
        alt="user-pic"
      />
      <List.Item color="white">{display_name}</List.Item>
      <List.Item font="13px" color="lightGray">
        {email}
      </List.Item>
    </Grid>
  )
}
