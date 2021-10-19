const express = require("express");
const router = express.Router();

// QueryString => query property on the req object
// localhots:3500/person?name=Matic&age=37
router.get("/query", (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person named ${req.query.name}`);
  } else {
    res.send("You have requested aall the Person");
  }
});

// Params on the req object
// localhots:3500/person/name
router.get("/params/:name", (req, res) => {
  res.send(`Hi! You have reached ${req.params.name} endpoint`);
});

router.get("/error", (req, res) => {
  // throw new Error("This is a forced error");
  res.send("Internal Error, Pls bear with us.");
});
module.exports = router;
