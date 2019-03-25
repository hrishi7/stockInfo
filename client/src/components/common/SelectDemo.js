import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import {
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MuiThemeProvider,
  TableFooter,
  TablePagination,
  createMuiTheme
} from "@material-ui/core";
import axios from "axios";
//import Chart from "../chart/Chart";
import TablePaginationActionsComponent from "./TablePaginationActionsComponent";
import { purple } from "@material-ui/core/colors";
import Spinner from "./Spinner";

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden"
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  textField: {
    marginLeft: 40,
    marginRight: theme.spacing.unit,
    width: 400
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true }
});

class SelectDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      symbols: "",
      from: new Date(),
      to: new Date(),
      chartData: {},
      page: 0,
      rowsPerPage: 8,
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange1 = this.onHandleChange1.bind(this);
    this.onHandleChange2 = this.onHandleChange2.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(symbols) {
    this.setState({
      symbols: symbols
    });
  }

  onHandleChange1(date) {
    this.setState({
      from: date
    });
  }

  onHandleChange2(date) {
    this.setState({
      to: date
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handChangePage = (event, page) => {
    this.setState({ page: page });
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    axios
      .get(
        `/api/stockinfo/${this.state.symbols}/${this.state.from}/${
          this.state.to
        }`
      )
      .then(res => {
        const rows = res.data;
        this.setState({
          rows: rows
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { rows, page, rowsPerPage } = this.state;
    let rws = [];
    if (rows.length > 0 || rws !== null) {
      rws = rows;
    }
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let dashboardContent = <Spinner />;
    return (
      <div className={classes.root}>
        <Grid container style={{ marginLeft: 20 }}>
          <Grid item>
            <TextField
              id="symbols"
              label="Symbols"
              type="text"
              value={this.state.symbols}
              className={classes.textField}
              onChange={e => this.onChange(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="date"
              label="From"
              type="date"
              value={this.state.from}
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => this.onHandleChange1(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="date"
              label="To"
              type="date"
              value={this.state.to}
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => this.onHandleChange2(e.target.value)}
            />
          </Grid>
          <Grid item style={{ marginLeft: 10, marginTop: 10 }}>
            <MuiThemeProvider theme={theme}>
              <Button
                onClick={this.onSubmit}
                color="primary"
                variant="contained"
              >
                Search Stock
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <Grid container style={{ marginLeft: 85, marginTop: 80 }}>
          <Grid item>
            <Paper style={{ width: "1300px" }}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Opening Price</TableCell>
                      <TableCell>Closing Price</TableCell>
                      <TableCell>Low Price</TableCell>
                      <TableCell>High Price</TableCell>
                      <TableCell>Volume</TableCell>
                      <TableCell align="center">Links</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length <= 0 && this.state.loading
                      ? dashboardContent
                      : ""}
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(row => {
                        const dateObj = new Date(row.date.toString());
                        const date = dateObj.getDate();
                        const month = dateObj.getMonth();
                        const year = dateObj.getFullYear();
                        return (
                          <TableRow key={row._id}>
                            <TableCell>{`${date}/${month}/${year}`}</TableCell>
                            <TableCell>{row.open}</TableCell>
                            <TableCell>{row.close}</TableCell>
                            <TableCell>{row.low}</TableCell>
                            <TableCell>{row.high}</TableCell>
                            <TableCell>{row.volume}</TableCell>
                            <TableCell>
                              <MuiThemeProvider theme={theme}>
                                <Button
                                  color="primary"
                                  href={`/singlestock/${row._id}`}
                                >
                                  View Details
                                </Button>
                              </MuiThemeProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={3}
                        rowsPerPageOptions={[8, 15, 30, 60, 100]}
                        page={page}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        onChangePage={this.handChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsComponent}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SelectDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SelectDemo);
