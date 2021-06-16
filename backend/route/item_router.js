module.exports = function (app) {
  const items = require("../controller/item_controller.js");

  const { isAuth, isAdmin } = require("../utils.js");

  // Create a new item
  app.post("/api/items", items.create);

  // Retrieve all items
  app.get("/api/items", items.findAll);

  // Retrieve an single item by Id
  app.get("/api/items/:id", items.findByPk);

  // Update an item with Id
  app.put("/api/items/:id", isAuth, isAdmin, items.update);

  // Delete an item with Id
  app.delete("/api/items/:id", isAuth, isAdmin, items.delete);

  // Search an item
  app.post("/api/item/search", items.search);
};
