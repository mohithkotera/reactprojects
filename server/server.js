const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
require("dotenv").config();
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", (req, res) => {
  console.log("DB connected successfully");
});
const route = require("./Routes/router");
app.use("/", route);
app.listen(port, () => {
  console.log(port, "running successfully");
});
