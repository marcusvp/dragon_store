const { isAuth, isAdmin } = require("../utils.js");

module.exports = function (app) {
  const order = require("../controller/order_controller.js");

  //Create order
  app.post("/api/order", isAuth, order.createOrder);

  //Fetch order
  app.get("/api/order/:id", isAuth, order.getOrder);

  //Pay/Update order
  app.put("/api/order/:id/pay", isAuth, order.payOrder);

  //Get client's orders
  app.get("/api/orders", isAuth, order.getClientOrders);

  //Get all orders
  app.get("/api/orders/admin", isAuth, isAdmin, order.getOrders);

  //Get all sales
  app.get("/api/sales", isAuth, isAdmin, order.getSales);
};
