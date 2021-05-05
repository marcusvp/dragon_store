module.exports = (sequelize, Sequelize) => {
  const PaymentResult = sequelize.define("paymentResult", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    paymentId: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    update_time: {
      type: Sequelize.STRING,
    },
    email_address: {
      type: Sequelize.STRING,
    },
  });

  return PaymentResult;
};
