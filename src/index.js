const express = require("express");
const app = express();
const personRoute = require("./route/person");
const customerRoute = require("./route/customer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to DB!");
});

app.use(bodyParser.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});

// Routes

app.use("/persons", personRoute);
app.use("/customers", customerRoute);

// Static Route
app.use(express.static("public"));

// Handler for 404: Resources Not found
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

// Handler for Error 500
app.use((err, req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/500.html"));
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
