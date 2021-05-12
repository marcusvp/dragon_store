module.exports = function (app) {
  const items = require("../controller/item_controller.js");
  const { isAuth, isAdmin } = require("../utils.js");

  // Create a new item
  app.post("/api/items", isAuth, isAdmin, items.create);

  // Retrieve all items
  app.get("/api/items", items.findAll);

  // Retrieve a single item by Id
  app.get("/api/items/:id", items.findByPk);

  // Update a item with Id
  app.put("/api/items/:id", isAuth, isAdmin, items.update);

  // Delete a item with Id
  app.delete("/api/items/:id", isAuth, isAdmin, items.delete);
};
