const mongoose = require("mongoose");

const Project = mongoose.model(
  "Milestone",
  new mongoose.Schema({
    milestone: Number,
    amount: String,
    totalamount: String,
    flEmail: String,
    custEmail: String,
    date: {
      type: Array,
      default: [Date],
    },
  })
);

module.exports = Project;
