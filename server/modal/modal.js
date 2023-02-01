const mongoose = require("mongoose");

const RevenueDetails = new mongoose.Schema(
  {
    Year: { type: String },
    Expense: { type: String },
  },
  {
    collection: "RevenueForcast",
  }
);

const RevenueForcasts = mongoose.model("RevenueForcast", RevenueDetails);

module.exports = RevenueForcasts;
