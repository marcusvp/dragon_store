module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    countInStock: {
      type: Sequelize.INTEGER,
    },
    brand: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.FLOAT,
    },
    numReviews: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Item;
};
