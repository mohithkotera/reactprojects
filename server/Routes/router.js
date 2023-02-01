const express = require("express");
const ExpenseRouter = express.Router();

const RevenueForcast = require("../modal/modal");

//////////Create Data////////////
ExpenseRouter.route("/create").post((req, res) => {
  const data = RevenueForcast(req.body);
  data
    .save()
    .then((response) => {
      console.log(response);
      res.json("Data Stored");
    })
    .catch((err) => {
      console.log(err);
    });
});

/////////Read Data///////////

ExpenseRouter.route("/readdata").post((req, res) => {
  RevenueForcast.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

/////////Update Data///////////

ExpenseRouter.route("/update").post((req, res) => {
  RevenueForcast.updateOne(
    { _id: req.body.id },
    {
      $set: {
        Expense: req.body.Expense,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
        console.log(result);
      }
    }
  );
});

/////////Delete///////////

ExpenseRouter.route("/delete").post((req, res) => {
  RevenueForcast.deleteOne({ _id: req.body._id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});
module.exports = ExpenseRouter;
