const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { invalidPathHandler, getErrorResponse } = require("./services/error");

// For PG
// app.set("views", __dirname + "/public");
// app.engine("html", require("ejs").renderFile);

app.get("/", function (req, res) {
  res.status(200).send("Base URL is hitted");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// app.use(cookieParser());

// Import Routes
const master = require("./routes/masterRoute");
app.use("/api/v1/backend", master);

app.use(express.static(`${__dirname}/assets`));

// Error Handler
app.use(invalidPathHandler);
app.use(getErrorResponse);

module.exports = app;
