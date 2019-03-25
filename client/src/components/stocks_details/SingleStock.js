import React, { Component } from "react";
import axios from "axios";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class SingleStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      symbol: "",
      open: "",
      close: "",
      low: "",
      high: "",
      volume: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/stockinfo/get/${id}`)
      .then(res => {
        this.setState({
          date: res.data.date,
          symbol: res.data.symbol,
          open: res.data.open,
          close: res.data.close,
          low: res.data.low,
          high: res.data.high,
          volume: res.data.volume
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const { date, symbol, open, close, low, high, volume } = this.state;
    const dateObj = new Date(date);
    console.log(this.state);
    return (
      <div>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Stock Details</ListSubheader>
          }
          className={classes.root}
        >
          <ListItem button>
            <ListItemIcon />
            <ListItemText inset primary="Date" />
            <ListItemText
              inset
              primary={
                date !== ""
                  ? dateObj.getDate() +
                    "/" +
                    (dateObj.getMonth() + 1) +
                    "/" +
                    dateObj.getFullYear()
                  : ""
              }
            />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon />
            <ListItemText inset primary="Symbol" />
            <ListItemText inset primary={symbol} />
          </ListItem>
          <ListItem button>
            <ListItemIcon />
            <ListItemText inset primary="Opening Stock" />
            <ListItemText inset primary={open} />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon />
            <ListItemText inset primary="Closing Stock" />
            <ListItemText inset primary={close} />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon />
            <ListItemText inset primary="High Price" />
            <ListItemText inset primary={high} />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon />
            <ListItemText inset primary="Low Price" />
            <ListItemText inset primary={low} />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon />
            <ListItemText inset primary="Volume" />
            <ListItemText inset primary={volume} />
          </ListItem>
        </List>
      </div>
    );
  }
}

SingleStock.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleStock);
