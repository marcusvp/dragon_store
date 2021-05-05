const db = require("../config/db.js");
const User = db.user;
const Address = db.address;

var bcrypt = require("bcryptjs");
const { generateToken } = require("../utils.js");

//Post user
exports.create = (req, res) => {
  //save to mariadb database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin,
  })
    .then((user) => {
      //send created user to client
      res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    })
    .catch((error) => res.status(400).send(error));
};

//Fetch all users
exports.findAll = (req, res) => {
  User.findAll({
    attributes: { exclude: ["updatedAt", "password"] },
    include: { model: Address },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.status(400).send(error));
};

//Find user by id
exports.findByPk = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send({
        message: "user not found" + error,
      });
    });
};

// Update an user
exports.update = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      }
      let password = user.password;
      if (req.body.password) {
        password = bcrypt.hashSync(req.body.password, 8);
      }
      user
        .update({
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          password: password, //password: bcrypt.hashSync(req.body.password, 8),
          isAdmin: req.body.isAdmin,
          token: generateToken(user),
        })
        .then((user) =>
          res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          })
        )
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

// Delete an user by id
exports.delete = (req, res) => {
  return User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "user not found",
        });
      }
      return user
        .destroy()
        .then(() => res.status(200).json({ message: "deleted succesfully" }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

exports.signin = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
        } else {
          res.status(401).send({ message: "invalid email or password" });
        }
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "user not found " + error,
      });
    });
};

exports.register = (req, res) => {
  //save to mariadb database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      //send created user to client
      res.json({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 8),
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    })
    .catch((error) => res.status(400).send(error));
};
