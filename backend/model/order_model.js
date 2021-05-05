module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    paymentMethod: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    itemsPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    shippingPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    taxPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paidAt: {
      type: Sequelize.DATE,
    },
    isDelivered: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    deliveredAt: {
      type: Sequelize.DATE,
    },
  });

  return Order;
};
