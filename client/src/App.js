import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

//import components
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Search from "./components/stock_variation/Search";
import SingleStock from "./components/stocks_details/SingleStock";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/singlestock/:id" component={SingleStock} />
        </div>
      </Router>
    );
  }
}

export default App;
