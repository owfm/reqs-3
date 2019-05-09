import React from "react";
import { connect } from "react-redux";

import * as actions from "actions/auth";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

function MenuAppBar({ auth }) {
  //   const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  console.log(auth);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          // className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" />
        {/* {renderMenu()} */}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(
  mapStateToProps,
  actions
)(MenuAppBar);
