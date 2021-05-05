const db = require("../config/db.js");
const Cart = db.cart;
const CartItem = db.cartItem;

exports.getOrCreateCart = (req, res) => {
  Cart.findCreateFind({
    where: { userId: req.user.id, finished: false },
  })
    .then((cart, created) => {
      if (created) {
        cart.setUser(req.body.id);
        res.send(cart);
      } else {
        res.send(cart);
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.postToCart = (req, res) => {
  Cart.findCreateFind({
    where: { userId: req.user.id, finished: false },
  }).then(([cart, created]) => {
    CartItem.findOrCreate({
      where: { cartId: cart.id, itemId: req.body.itemId },
    }).then(([cartItem, created]) => {
      cartItem.update({
        qty: req.body.qty,
      });
      res.status(200).send(cartItem);
    });
  });
};

exports.getItems = (req, res) => {
  Cart.findAll({
    where: { userId: req.user.id, finished: false },
    include: CartItem,
  })
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => res.status(400).send(error));
};

exports.remove = (req, res) => {
  Cart.findOne({
    where: { userId: req.user.id, finished: false },
  })
    .then((cart) => {
      CartItem.findOne({
        where: { cartId: cart.id, itemId: req.body.itemId },
      }).then((cartItem) => {
        if (!cartItem) {
          return res.status(400).send({
            message: "item not found",
          });
        }
        return cartItem
          .destroy()
          .then(() => res.status(200).json({ message: "deleted successfully" }))
          .catch((error) => res.status(400).send(error));
      });
    })
    .catch((error) => res.status(400).send(error));
};
