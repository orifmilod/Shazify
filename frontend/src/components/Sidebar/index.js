import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Grid } from '../../styled'
import Playlist from './Playlist'
import Profile from './Profile'
import { useSelector } from 'react-redux'

import { getUserPlaylist } from '../../api/spotify'
import handleError from '../../utils/handleError'
import { clearTokens } from '../../utils/getAccessToken'

const Container = styled(Grid)`
  background: rgb(84, 136, 150);
  overflow-y: scroll;
  overflow-x: hidden;
  grid-auto-rows: 180px 70px 1fr;
`

const SignOutButton = styled.button`
  bottom: 20px;
  border-radius: 20px;
  width: 200px;
  margin: auto;
  color: white;
  border: none;
  padding: 5px 10px;
  background: linear-gradient(to left, #ff4b2b, #ff416c);
  :focus {
    outline: 0;
  }
`

export default function Sidebar() {
  const [playlist, setPlaylist] = useState([])
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    getPlaylist()
  }, [])

  async function getPlaylist() {
    try {
      const userPlaylist = await getUserPlaylist()
      setPlaylist(userPlaylist.items)
    } catch (error) {
      handleError('Something went wrong when fetching your playlist!', error)
    }
  }

  function signOut() {
    clearTokens()
    window.location.reload()
  }

  return (
    <Container bg="blue">
      {userData && <Profile userData={userData} />}
      <SignOutButton onClick={signOut}>Sign out</SignOutButton>
      {playlist && <Playlist playlists={playlist} />}
    </Container>
  )
}
