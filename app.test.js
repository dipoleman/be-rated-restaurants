const request = require("supertest");
const app = require("./app");
const db = require("./db/connection");
// const { deleteRestaurant } = require("./controllers/api.controller");
afterAll(() => {
  return db.end();
});
describe("GET api", () => {
  test("200 with ok message", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toBe("all ok");
      });
  });
  test("should return an array", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body));
      });
  });
  test("should iterate through restaurants and check each key for data type", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then(({ body }) => {
        const { restaurants } = body;
        restaurants.forEach((restaurant) => {
          expect(restaurant).toMatchObject({
            restaurant_id: expect.any(Number),
            restaurant_name: expect.any(String),
            area_id: expect.any(Number),
            cuisine: expect.any(String),
            website: expect.any(String),
          });
        });
      });
  });
});
describe("POST api/restaurants", () => {
  test("should return new array of objects, with new restaurant added", () => {
    const newRestaurant = {
      restaurant_name: "The Codfather",
      area_id: 2,
      cuisine: "British",
      website: "www.thecodfather.com",
    };
    return request(app)
      .post("/api/restaurants")
      .expect(201)
      .send(newRestaurant)
      .then(({ body }) => {
        expect(body.addedRestaurant).toEqual({
          restaurant_id: 9,
          ...newRestaurant,
        });
      });
  });
});

describe("DELETE api/restaurants/:id", () => {
  test("should delete restaurant object from database and respond with 204 code", () => {
    return request(app)
      .delete("/api/restaurants/2")
      .expect(204)
  });
  test("Error 404 if user restaurant_id is valid but does not exist",()=>{
    return request(app)
    .delete("/api/restaurants/9999")
    .expect(404)
  })
  test("Error 400 if user restaurant_id is an invalid type",()=>{
    return request(app)
      .delete("/api/restaurants/apple")
      .expect(400)
  })

});


