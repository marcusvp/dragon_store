module.exports = (sequelize, Sequelize) => {
  const CartItem = sequelize.define("cartItem", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    qty: {
      type: Sequelize.INTEGER,
    },
  });

  return CartItem;
};
