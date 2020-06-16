const express = require("express");
const genresRoutes = require("../routes/genres");
const customersRoutes = require("../routes/customers");
const movieRoutes = require("../routes/movies");
const rentalsRoutes = require("../routes/rentals");
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const returnRoutes = require('../routes/return')
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genresRoutes);
  app.use("/api/customers", customersRoutes);
  app.use("/api/movies", movieRoutes);
  app.use("/api/rentals", rentalsRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/returns", returnRoutes);
  app.use(error);
};
