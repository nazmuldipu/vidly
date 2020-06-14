const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const genresRoutes = require("./routes/genres");
const customersRoutes = require('./routes/customers');
const movieRoutes = require('./routes/movies');
const rentalsRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connected to MongoDB ... ", err));

app.use(express.json());
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/movies", movieRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hellow Vidly!");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
