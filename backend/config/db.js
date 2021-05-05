const env = require("./env.js");
const { applyAssociations } = require("./applyAssociations.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.address = require("../model/address_model.js")(sequelize, Sequelize);
db.cart = require("../model/cart_model.js")(sequelize, Sequelize);
db.cartItem = require("../model/cartItem_model.js")(sequelize, Sequelize);
db.item = require("../model/item_model.js")(sequelize, Sequelize);
db.order = require("../model/order_model.js")(sequelize, Sequelize);
db.user = require("../model/user_model.js")(sequelize, Sequelize);
db.paymentResult = require("../model/paymentResult_model.js")(
  sequelize,
  Sequelize
);

applyAssociations(sequelize);

module.exports = db;
