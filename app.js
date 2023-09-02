const express = require("express");
const {
  sendMessage,
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
} = require("./controllers/api.controller");

const { handleCustomErrors, handlePsqlErrors } = require("./Errors/index");

const app = express();
app.use(express.json());

app.get("/api", sendMessage);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:id", deleteRestaurant);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
