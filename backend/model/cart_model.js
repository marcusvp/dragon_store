module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    finished: Sequelize.BOOLEAN,
  });
  return Cart;
};
