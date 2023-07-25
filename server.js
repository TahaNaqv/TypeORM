const express = require("express");
const app = express();
const empRoute = require("./routes/employee.route");
var bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use("/api/employee/", empRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
