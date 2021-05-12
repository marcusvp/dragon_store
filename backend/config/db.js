const { applyAssociations } = require("./applyAssociations.js");

const env = {
  database: process.env.DATABASE_NAME || "dragondb",
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "root",
  host: process.env.DATABASE_HOST || "localhost",
  dialect: process.env.DATABASE_DIALECT || "mysql",
  max: process.env.DATABASE_MAX || 5,
  min: process.env.DATABASE_MIN || 0,
  acquire: process.env.DATABASE_ACQUIRE || 30000,
  idle: process.env.DATABASE_IDLE || 10000,
};
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle,
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
