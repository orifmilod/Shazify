import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

const _ListItem = props => {
  const { classname, text, divider } = props;
  console.log(divider);
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Icon className={classname} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
      {divider && <Divider />}
    </>
  );
};

export default _ListItem;
