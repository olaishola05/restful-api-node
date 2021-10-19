const express = require("express");
const router = express.Router();

// Route
router.get("/", (req, res) => {
  res.send("You have requested the Person api");
});

// QueryString => query property on the req object
// localhots:3500/person?name=Matic&age=37
router.get("/", (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person ${req.query.name}`);
  } else {
    res.send("You have requested a Person");
  }
});

// Params on the req object
// localhots:3500/person/name
router.get("/:name", (req, res) => {
  res.send(`Hi! You have reached ${req.params.name} endpoint`);
});

module.exports = router;
