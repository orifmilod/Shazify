import React from "react";
import Divider from "@material-ui/core/Divider";
// import Avatar from "@material-ui/core/Avatar";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import ListItem from "../../common/ListItem";
import Grid from "../../common/Grid";
import Image from "../../common/Image";
import P from "../../common/P";

const Track = ({ track, playTrack }) => {
  const { name, artists, album, id } = track;
  return (
    <>
      <ListItem onClick={() => playTrack(id)}>
        <Grid display="row" justify="space-between" alignItems="c">
          <Image src={album.images[0].url} />
          <P>{name}</P>
          <P secondary>{artists.map(artists => `${artists.name} `)}</P>
          {/* <ListItemText
            primary={name}
            secondary=
          /> */}
        </Grid>
      </ListItem>
    </>
  );
};

export default Track;
