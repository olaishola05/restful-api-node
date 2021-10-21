const CustomerModel = require("../models/customers.model");
const express = require("express");
const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create new customer
router.post("/", async (req, res) => {
  const customer = new CustomerModel(req.body);
  try {
    if (!customer) {
      res.send("Request is empty");
    } else {
      const savedCustomer = await customer.save();
      res.status(201).json(savedCustomer);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// get customeer with email
router.get("/", async (req, res) => {
  if (!req.query.email) {
    return res.status(400).json("Missing URL parameter: email");
  }

  try {
    const custome = await CustomerModel.find(req.query.email);
    res.status(200).json(custome);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// get user by id
router.get("/:customerId", async (req, res) => {
  try {
    const id = req.params.customerId;
    const customer = await CustomerModel.findById(id);
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
