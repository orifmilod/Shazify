import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const PlayLists = props => {
  return (
    <List component="nav" aria-label="Secondary mailbox folders">
      <ListItem>
        <ListItemText primary="Trash" />
      </ListItem>
      <ListItemText primary="Spam" />
    </List>
  );
};

export default PlayLists;
