const db = require("../config/db.js");
const Item = db.item;

//Post item
exports.create = (req, res) => {
  //save to mariadb database
  Item.create({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    countInStock: req.body.countInStock,
    brand: req.body.brand,
    rating: req.body.rating || 0,
    numReviews: req.body.numReviews || 0,
    description: req.body.description,
  })
    .then((item) => {
      //send created item to client
      res.json(item);
    })
    .catch((error) => res.status(400).send(error));
};

//Fetch all items
exports.findAll = (req, res) => {
  Item.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((items) => {
      res.send(items);
    })
    .catch((error) => res.status(400).send(error));
};

//Find item by id
exports.findByPk = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.status(500).send({
        message: "item not found" + error,
      });
    });
};

// Update an item
exports.update = (req, res) => {
  return Item.findByPk(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({
          message: "item not found",
        });
      }
      return item
        .update({
          name: req.body.name,
          category: req.body.type,
          image: req.body.image,
          price: req.body.price,
          countInStock: req.body.countInStock,
          brand: req.body.brand,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          description: req.body.description,
        })
        .then(() => res.status(200).json(item))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

// Delete an item by id
exports.delete = (req, res) => {
  return Item.findByPk(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(400).send({
          message: "item not found",
        });
      }

      return item
        .destroy()
        .then(() => res.status(200).json({ message: "deleted succesfully" }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};
