module.exports = function (app) {
  const paypal = require("../controller/paypal_controller.js");

  //get paypal info
  app.get("/api/config/paypal", paypal.getPaypalId);
};
