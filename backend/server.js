var dotenv = require("dotenv");
var express = require("express");
const cors = require("cors");

dotenv.config();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const db = require("./config/db.js");

// force: true will drop the table if it already exists
db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
  .then((results) => {
    db.sequelize.sync({ force: false });
    console.log(results);
  });

require("./route/user_router.js")(app);
require("./route/item_router.js")(app);
require("./route/cart_router.js")(app);
require("./route/order_router.js")(app);
require("./route/paypal_router.js")(app);
require("./route/file_router.js")(app);

// Create a Server
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
