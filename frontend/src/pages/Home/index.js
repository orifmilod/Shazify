import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Grid } from '../../styled'
import { Sidebar, Player, Navbar, Content } from '../../components'

import handleError from '../../utils/handleError'
import { setUserData, setFeaturedPlaylist } from '../../reducers/rootReduce'
import { getUserData, getFeaturedPlaylists } from '../../api/spotify'

const Container = styled(Grid)`
  grid-auto-flow: column;
  grid-auto-columns: 1fr 5fr;
  @media all and (max-width: 768px) {
    grid-auto-flow: row;
  }
`

export default function Home() {
  const dispatch = useDispatch()
  const TRACK_LIMIT = 50

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      const data = await getUserData()
      fetchFeaturedPlaylist(data.country)
      dispatch(setUserData(data))
    } catch (error) {
      handleError(
        'Something went wrong when fetching your personal data',
        error
      )
    }
  }

  async function fetchFeaturedPlaylist(country) {
    try {
      const playlist = await getFeaturedPlaylists(TRACK_LIMIT, country)
      dispatch(setFeaturedPlaylist(playlist))
    } catch (error) {
      handleError('Some error occured when fetching Featured Playlists.', error)
    }
  }

  const ContentContainer = styled(Grid)`
    height: 100vh;
    grid-template-rows: 50px 2fr 100px;
    grid-auto-flow: row;
  `

  return (
    <Container>
      <Sidebar />
      <ContentContainer bg="light">
        <Navbar />
        <Content />
        <Player />
      </ContentContainer>
    </Container>
  )
}
