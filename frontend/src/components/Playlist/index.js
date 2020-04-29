import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Grid, P } from '../../styled'
import { Loading } from '../index.js'
import TrackTable from './TrackTable'
import { getPlaylistData } from '../../api/spotify'
import handleError from '../../utils/handleError'
import formatNumber from '../../utils/formatNumber'

const HeaderImage = styled.img`
  margin: auto;
  width: 150px;
  height: 150px;
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
`

const TableNav = styled(Grid)`
  padding: 10px 25px;
  grid-auto-columns: 250px 1fr;
  grid-auto-flow: column;
`

export default function Playlist({ playTrack, match }) {
  const [playlistData, setPlaylistData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const playlistID = match.params.playlistID

  useEffect(() => {
    if (playlistID) {
      getPlaylist()
    }
  }, [playlistID])

  async function getPlaylist() {
    setIsLoading(true)
    try {
      const playlist = await getPlaylistData(playlistID)
      setPlaylistData(playlist)
    } catch (error) {
      handleError('Something went wrong when getting playlist', error)
    }
    setIsLoading(false)
  }

  if (isLoading || !playlistData || !playlistData.tracks) {
    return <Loading />
  }

  const tracks = playlistData.tracks.items.map(({ track }) => track)
  const { name, description, followers } = playlistData

  return (
    <>
      <TableNav>
        {playlistData.hasOwnProperty('images') && (
          <HeaderImage src={playlistData.images[0].url} />
        )}
        <Grid>
          <P font="xxl">{name}</P>
          <P color="grey"> {description}</P>
          <small>Followers: {formatNumber(followers.total)} </small>
        </Grid>
      </TableNav>
      <TrackTable playTrack={playTrack} tracks={tracks} />
    </>
  )
}
