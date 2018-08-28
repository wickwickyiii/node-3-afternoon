const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    let { category } = req.query;
    let filter = swag.filter(swag => swag.category === category);

    if (!category) {
      res.status(200).json(swag);
    } else {
      res.status(200).json(filter);
    }
  }
};
