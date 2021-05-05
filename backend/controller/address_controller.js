const db = require("../config/db.js");
const Address = db.address;

exports.registerOrRetrieve = (req, res) => {
  Address.findCreateFind({
    defaults: {
      fullName: req.body.fullName,
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    },
    where: { userId: req.user.id },
  })
    .then((address, created) => {
      if (created) {
        address.setUser(req.user.id);
        res.status(200).json({ address });
      } else {
        res.status(200).json({ address });
      }
    })
    .catch((error) => res.status(400).send(error));
};

exports.findAddresses = (req, res) => {
  Address.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((addresses) => {
      res.send(addresses);
    })
    .catch((error) => res.status(400).send(error));
};

exports.getAddress = (req, res) => {
  Address.findOne({
    where: { userId: req.user.id },
    attributes: { exclude: ["id", "userId"] },
    raw: true,
  })
    .then((address) => {
      res.json(address);
    })
    .catch((error) => {
      res.status(500).send({ message: "address not found" + error });
    });
};
