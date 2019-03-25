const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema({
  date: {
    type: String
  },
  symbol: {
    type: String
  },
  open: {
    type: Number
  },
  close: {
    type: Number
  },
  low: {
    type: Number
  },
  hight: {
    type: Number
  },
  volume: {
    type: String
  }
});

module.exports = Stock = mongoose.model("stocks", StockSchema);
