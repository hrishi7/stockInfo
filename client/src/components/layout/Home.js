import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableHead,
  Button,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import TablePaginationActionsComponent from "../common/TablePaginationActionsComponent";
import { purple } from "@material-ui/core/colors";
import Spinner from "../common/Spinner";

const styles = theme => ({
  root: {
    width: "88%",
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 10
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 8,
      rows: []
    };
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  gettingStockDate = id => {
    axios.get(`/api/stockinfo/nextBatch/${id}`).then(res => {
      let tempArray = [];
      tempArray = this.state.rows;
      res.data.forEach(element => {
        tempArray.push(element);
      });
      this.setState({
        rows: tempArray
      });
    });
  };

  handChangePage = (event, page) => {
    this.setState({ page: page });
    if (
      Math.ceil(this.state.rows.length / this.state.rowsPerPage) - 1 ===
      page
    ) {
      this.gettingStockDate(this.state.rows[this.state.rows.length - 1]._id);
    }
  };

  componentDidMount() {
    axios.get("/api/stockinfo").then(res =>
      this.setState({
        rows: res.data
      })
    );
  }
  render() {
    const { classes } = this.props;
    const { rows, page, rowsPerPage } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let dashboardContent = <Spinner />;
    return (
      <div>
        <br />
        <h1>Welcome User Here We Provide Stock Trading data!!</h1>
        <hr />
        <h3>
          <div>List of best top Stocks</div>
        </h3>
        <br />
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Opening Price</TableCell>
                  <TableCell>Closing Price</TableCell>
                  <TableCell>Low Price</TableCell>
                  <TableCell>High Price</TableCell>
                  <TableCell>Volume</TableCell>
                  <TableCell align="center">Links</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length <= 0 ? dashboardContent : ""}
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    const dateObj = new Date(row.date.toString());
                    const date = dateObj.getDate();
                    const month = dateObj.getMonth();
                    const year = dateObj.getFullYear();
                    return (
                      <TableRow key={row._id}>
                        <TableCell>{`${date}/${month}/${year}`}</TableCell>
                        <TableCell>{row.symbol}</TableCell>
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
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, theme)(Home);
