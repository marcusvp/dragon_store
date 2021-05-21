const { isAuth, isAdmin } = require("../utils.js");

module.exports = function (app) {
  const users = require("../controller/user_controller.js");

  // Create a new user
  app.post("/api/users", users.create);

  // Retrieve all users
  app.get("/api/users", isAuth, isAdmin, users.findAll);

  // Retrieve a single user by Id
  app.get("/api/users/:id", isAuth, users.findByPk);

  // Update a user with Id
  app.put("/api/users/:id", isAuth, users.update);

  // Delete a user with Id
  app.delete("/api/users/:id", users.delete);

  // Login user
  app.post("/api/users/signin", users.signin);

  // Register user
  app.post("/api/users/register", users.register);
};
