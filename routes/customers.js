//Customer routes file
const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();
const {Customer, validate} = require('../models/customer')

/*------------------CREATE-----------------*/
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body); //result.error
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save(customer);
  res.send(customer);
});

/*------------------UPDATE-----------------*/
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body); //result.error
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

/*------------------READ ALL-----------------*/
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

/*------------------READ ONE-----------------*/
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

/*------------------DELETE-----------------*/
router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

module.exports = router;
