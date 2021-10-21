const CustomerModel = require("../models/customers.model");
const express = require("express");
const router = express.Router();

// Get all customers
router.get("/all", async (req, res) => {
  try {
    const customers = await CustomerModel.find({});
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create new customer
router.post("/", async (req, res) => {
  try {
    const customer = await new CustomerModel(req.body);
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

// get customeer with email
router.get("/", async (req, res) => {
  const email = req.query.email;
  const userId = req.query.userId;
  try {
    const customer = email
      ? await CustomerModel.findOne({ email: email })
      : await CustomerModel.findById(userId);

    if (!customer) {
      return res.status(400).json("Customer does not exist");
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/", async (req, res) => {
  try {
    if (!req.query.email) {
      return res.status(400).send("Missing Url Parameter: email");
    }

    const updatedCus = await CustomerModel.findOneAndUpdate(
      { email: req.query.email },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedCus);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

// delete
router.delete("/", async (req, res) => {
  try {
    if (!req.query.email) {
      return res.status(400).send("Missing Url Parameter: email");
    }

    const delCustomer = await CustomerModel.findOneAndRemove(req.query.email);
    res.status(200).json(delCustomer);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
