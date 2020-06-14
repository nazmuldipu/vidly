//Genres routes file
const bcrypt = require('bcrypt');
const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

//------------------REGISTER-----------------
router.post("/", async (req, res) => {
  const { error } = validate(req.body); //result.error
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already register");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save(user);

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
