const restaurants = require("../db/data/restaurants");
const {
  selectRestaurants,
  addRestaurant,
  deleteRestaurantById,
} = require("../models/restaurant.model");

exports.sendMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.getRestaurants = (req, res) => {
  selectRestaurants().then((restaurants) => {
    res.status(200).send({ restaurants });
  });
};

exports.postRestaurant = (req, res) => {
  addRestaurant(req.body).then((addedRestaurant) => {
    res.status(201).send({ addedRestaurant });
  });
};

exports.deleteRestaurant = (req, res, next) => {
  const  restaurant_id  = req.params.id
  deleteRestaurantById(restaurant_id).then((rows) => {
    const deletedRestaurant = rows
    res.status(204).send({ deletedRestaurant });
  })
  .catch(next);
};
