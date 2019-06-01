import React from "react";
import { connect } from "react-redux";
import { openDrawer, closeDrawer } from "actions/ui";
import { makeStyles } from "@material-ui/core/styles";
import history from "history/history";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DashboardIcon from "@material-ui/icons/Dashboard";

import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function TemporaryDrawer({ close, drawerOpen }) {
  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    close();
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push(`/dashboard`)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={() => history.push(`/lessons`)}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary={"Lessons"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Drawer anchor="left" open={drawerOpen} onClose={() => close()}>
        {sideList("left")}
      </Drawer>
    </>
  );
}

const mapStateToProps = state => {
  return {
    drawerOpen: state.ui.drawer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    open: () => dispatch(openDrawer()),
    close: () => dispatch(closeDrawer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemporaryDrawer);
