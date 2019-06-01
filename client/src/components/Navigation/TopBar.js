import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { OPEN_LOGIN } from "actions/modalTypes";
import { openModal, openDrawer } from "actions/ui";
import { signout } from "actions/auth";
import history from "history/history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar({ openLoginModal, openDrawer, logout, auth }) {
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {auth.user && (
            <IconButton
              onClick={openDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {auth.user ? `Welcome, ${auth.user.firstName}` : "Welcome"}
          </Typography>
          {auth.user ? (
            <Button onClick={() => handleLogout()} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={openLoginModal} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(signout()),
    openLoginModal: () => dispatch(openModal({ modalType: OPEN_LOGIN })),
    openDrawer: () => dispatch(openDrawer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonAppBar);
