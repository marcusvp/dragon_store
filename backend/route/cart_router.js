const { isAuth } = require("../utils.js");

module.exports = function (app) {
  const cart = require("../controller/cart_controller.js");
  const address = require("../controller/address_controller.js");

  //Create or return user cart
  app.get("/api/cart/create", isAuth, cart.getOrCreateCart);

  //Post cartItem to cart
  app.post("/api/cart/post_item", isAuth, cart.postToCart);

  //Get items from cart
  app.get("/api/cart", isAuth, cart.getItems);

  //Delete one item from cart
  app.post("/api/cart/remove", isAuth, cart.remove);

  // Register user address
  app.post("/api/addresses/register", isAuth, address.registerOrRetrieve);

  // Fetch user address
  app.get("/api/user/address/", isAuth, address.getAddress);

  // Retrieve all user addresses
  app.get("/api/addresses", address.findAddresses);
};
