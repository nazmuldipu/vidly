//Genres routes file
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const { Genre, validate } = require("../models/genre");

//------------------CREATE-----------------
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body); //result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save(genre);
  res.send(genre);
});

//------------------UPDATE-----------------
router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); //result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

//------------------READ ALL-----------------
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//------------------READ ONE-----------------
router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

//------------------DELETE-----------------
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});

module.exports = router;
