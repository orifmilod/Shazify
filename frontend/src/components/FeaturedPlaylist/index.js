import React from "react";
import Gallery from "react-photo-gallery";
import { withRouter } from "react-router-dom";
import { Loading } from '../../components'
import { useSelector } from 'react-redux';

function FeaturedPlaylist({ history }) {
  const playlistData = useSelector(state => state.featuredPlaylist);
  if (!playlistData)
    return <Loading />

  const featuredPlaylist = playlistData.playlists.items;
  const photos = featuredPlaylist.map(playlist => {
    return {
      id: playlist.id,
      src: playlist.images[0].url,
      width: 1,
      height: 1
    };
  });

  return (
    <>
      {
        <Gallery
          photos={photos}
          onClick={e => history.push(`/home/playlist/${e.target.id}`)}
        />
      }
    </>
  );
}

export default withRouter(FeaturedPlaylist);
