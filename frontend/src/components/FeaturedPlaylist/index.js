import React from 'react'
import Gallery from 'react-photo-gallery'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Loading } from '../../components'

function FeaturedPlaylist({ history }) {
  const playlistData = useSelector((state) => state.featuredPlaylist)
  if (!playlistData) return <Loading />

  const featuredPlaylist = playlistData.playlists.items
  const photos = featuredPlaylist.map((playlist) => {
    return {
      id: playlist.id,
      src: playlist.images[0].url,
      width: 1,
      height: 1,
    }
  })

  return (
    <Gallery
      photos={photos}
      onClick={({ target }) => history.push(`/home/playlist/${target.id}`)}
    />
  )
}

export default withRouter(FeaturedPlaylist)
