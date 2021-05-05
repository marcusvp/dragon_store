const db = require("../config/db.js");
const Order = db.order;
const Cart = db.cart;
const Address = db.address;
const User = db.user;
const CartItem = db.cartItem;
const Item = db.item;
const PaymentResult = db.paymentResult;

exports.createOrder = (req, res) => {
  const toPrice = (num) => Number(num.toFixed(2));
  Cart.findOne({
    where: { userId: req.user.id, finished: false },
    include: CartItem,
  })
    .then((cart) => {
      if (!cart.hasCartItems) {
        res.status(400).send({ message: "cart is empty" });
      } else {
        Address.findOne({ where: { userId: req.user.id } })
          .then((address) => {
            User.findOne({ where: { id: req.user.id } })
              .then((user) => {
                const itemsPrice = req.body.itemsPrice;
                const taxPrice = toPrice(0.15 * itemsPrice);
                const shippingPrice =
                  itemsPrice > 100 ? toPrice(0) : toPrice(10);
                const totalPrice = itemsPrice + taxPrice + shippingPrice;
                Order.create({
                  paymentMethod: req.body.paymentMethod,
                  itemsPrice: itemsPrice,
                  shippingPrice: shippingPrice,
                  taxPrice: taxPrice,
                  totalPrice: totalPrice,
                  isPaid: false,
                })
                  .then((order) => {
                    if (order) {
                      cart.update({
                        finished: true,
                      });
                      order.setUser(user);
                      order.setCart(cart);
                      order.setAddress(address);

                      res
                        .status(200)
                        .send({ message: "new order created", order: order });
                    }
                  })
                  .catch((error) =>
                    res.status(400).send({ message: "order " + error })
                  );
              })
              .catch((error) =>
                res.status(400).send({ message: "user " + error })
              );
          })
          .catch((error) =>
            res.status(400).send({ message: "address " + error })
          );
      }
    })
    .catch((error) => res.status(400).send({ message: "cart " + error }));
};

exports.getOrder = (req, res) => {
  Order.findOne({
    where: { id: req.params.id },
    include: [
      { model: Address },
      { model: Cart, include: { model: CartItem, include: { model: Item } } },
    ],
  })
    .then((order) => {
      res.send(order);
    })
    .catch((error) => {
      res.status(404).send({
        message: "order not found " + error,
      });
    });
};

exports.payOrder = (req, res) => {
  Order.findOne({
    where: { id: req.params.id },
  }).then((order) => {
    if (order) {
      order.update({ isPaid: true, paidAt: Date.now() }).then((order) => {
        PaymentResult.upsert({
          orderId: order.id,
          paymentId: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
        res.status(200).send(order);
      });
    } else {
      res.status(404).send({ message: "order not found" });
    }
  });
};

exports.getClientOrders = (req, res) => {
  Order.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]],
  })
    .then((orders) => {
      if (orders) {
        res.status(200).send(orders);
      } else {
        res.send(404).send({ message: "orders not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getOrders = (req, res) => {
  Order.findAll({
    order: [["createdAt", "DESC"]],
    include: { model: User },
  })
    .then((orders) => {
      if (orders) {
        res.status(200).send(orders);
      } else {
        res.send(404).send({ message: "orders not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
