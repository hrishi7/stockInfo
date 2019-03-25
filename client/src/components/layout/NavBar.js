import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI import components
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "transparent"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  widthList: {
    width: "auto"
  },
  avatar: {
    margin: 5
  },
  navbar: {
    background: "#b39ddb",
    color: "black",
    boxShadow: "none"
  }
});

class NavBar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="relative" className={classes.navbar}>
          <Toolbar>
            <Typography style={{ width: 1250 }} />
            <Button href="/">HOME</Button>
            <Button href="/search">Search</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
