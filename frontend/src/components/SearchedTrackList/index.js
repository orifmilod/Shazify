import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import P from '../../styled/P'
import TrackTable from '../Playlist/TrackTable'

import { searchTrack } from '../../api/spotify'

function TrackList({ match, playTrack }) {
  const [searchList, setSearchList] = useState([])
  const searchedTrack = match.params.searchedTrack

  useEffect(() => {
    if (searchedTrack) findTrack(searchedTrack)
  }, [searchedTrack])

  async function findTrack(searchedTrack) {
    try {
      const data = await searchTrack(searchedTrack)
      setSearchList(data.tracks.items)
    } catch (error) {
      console.log(error)
      toast.error("Sorry couldn't find any tracks. :(")
    }
  }
  return (
    <>
      {searchList.length > 0 ? (
        <TrackTable playTrack={playTrack} tracks={searchList} />
      ) : (
        <P>Sorry, couldn't find any tracks.</P>
      )}
    </>
  )
}

export default withRouter(TrackList)
