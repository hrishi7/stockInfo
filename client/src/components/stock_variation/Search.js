import React, { Component } from "react";
import SelectDemo from "../common/SelectDemo";

export class Search extends Component {
  render() {
    return (
      <div>
        <br />
        <h1>Search a stock by symbol or name and dates!!</h1>
        <br />
        <SelectDemo />
        <br />
        <br />
      </div>
    );
  }
}

export default Search;
