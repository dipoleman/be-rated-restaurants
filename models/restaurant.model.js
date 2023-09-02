const db = require("../db/connection");

exports.selectRestaurants = () => {
  return db.query("SELECT * FROM restaurants").then(({ rows }) => {
    return rows;
  });
};

exports.addRestaurant = (restaurant) => {
  return db
    .query(
      "INSERT INTO restaurants (restaurant_name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        restaurant.restaurant_name,
        restaurant.area_id,
        restaurant.cuisine,
        restaurant.website,
      ]
    )
    .then((response) => {
      const rows = response.rows;
      const newRestObj = rows[0];
      return newRestObj;
    });
};

exports.deleteRestaurantById = (restaurant_id) => {
  return db.query(
    `DELETE FROM restaurants WHERE restaurant_id = ($1) RETURNING *`,
    [restaurant_id]
  ).then ((result)=>{
      if(result.rows.length === 0 ){
        return Promise.reject({status:404,msg:"Not found"})
      }
      return result.rows[0]
  })
};
