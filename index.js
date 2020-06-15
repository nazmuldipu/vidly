require("express-async-errors");
const winston = require("winston");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genresRoutes = require("./routes/genres");
const customersRoutes = require("./routes/customers");
const movieRoutes = require("./routes/movies");
const rentalsRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const error = require("./middleware/error");
const express = require("express");
const app = express();

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connected to MongoDB ... ", err));

app.use(express.json());
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/rentals", rentalsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(error);
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
