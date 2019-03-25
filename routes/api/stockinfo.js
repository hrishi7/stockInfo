const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../../config/keys").mongoURI;
//load models
const Stock = require("../../models/Stock");
let arr = [];

// @route   GET api/stockinfo/test
// @desc    Tests offer route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "stockinfo Works" }));

// @route   GET api/stockinfo/
// @desc    get first 50 high rate stock list
// @access  Public
router.get("/", async (req, res) => {
  const cursor = await Stock.find({})
    .sort({ high: -1, date: -1})
    .limit(100);
  res.json(cursor);
});

// @route   GET api/stockinfo/:symbol
// @desc    get first 50 high rate stock list by symbol
// @access  Public

router.get("/:symbol", async (req, res) => {
  const result = await Stock.find({ symbol: req.params.symbol });
  /*.sort({ high: -1 })
    .limit(100);*/
  res.json(result.length);
});

// @route   GET api/stockinfo/get/:id
// @desc    get stock detail by stock id
// @access  Public

router.get("/get/:id/", async (req, res) => {
  const result = await Stock.findOne({ _id: req.params.id });
  res.json(result);
});

// @route   GET api/stockinfo/:symbol/:startDate/:endDate
// @desc    get stock detail by stock id
// @access  Public
router.get("/:symbol/:startDate/:endDate", async (req, res) => {
  const result = await Stock.find({ symbol: req.params.symbol }).sort({
    date: -1
  });
  result.forEach(one => {
    resultDate = Date.parse(one.date);
    startDate = Date.parse(req.params.startDate);
    endDate = Date.parse(req.params.endDate);
    if (resultDate >= startDate && resultDate <= endDate) {
      arr.push(one);
    }
  });
  res.json(arr);
});

//testing route
router.get("/nextBatch/:id", async (req, res) => {
  let ob = new mongoose.Types.ObjectId(req.params.id);
  const result = await Stock.find({ _id: { $gt: ob } }).limit(100);
  res.json(result);
});

module.exports = router;
