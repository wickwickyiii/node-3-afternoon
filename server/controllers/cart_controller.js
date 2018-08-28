const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    if (
      req.session.user.cart.findIndex(swag => swag.id == req.query.id) === -1
    ) {
      req.session.user.cart.push(swag.find(swag => swag.id == req.query.id));
      req.session.user.total += swag.find(
        swag => swag.id == req.query.id
      ).price;
    }
    res.status(200).json(req.session.user);
  },
  delete: (req, res, next) => {
    let swagPrice = swag.find(swag => swag.id == req.query.id);

    if (swagPrice) {
      req.session.user.cart.splice(
        req.session.user.cart.findIndex(swag => swag.id == req.query.id),
        1
      );
      req.session.user.total -= swagPrice.price;
    }
    res.status(200).json(req.session.user);
  },
  checkout: (req, res, next) => {
    req.session.user.cart = [];
    req.session.user.total = 0;
    res.status(200).json(req.session.user);
  }
};
