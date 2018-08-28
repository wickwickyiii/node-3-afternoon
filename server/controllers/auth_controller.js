const users = require("../models/users");

var id = 1;

module.exports = {
  login: (req, res, next) => {
    if (
      req.session.user.username === req.body.username &&
      req.session.user.password === req.body.password
    ) {
      req.session.user.username = req.body.username;
      res.status(200).json(req.session.user);
    } else {
      res.status(500).json("UNAUTHORIZED");
    }
  },
  register: (req, res, next) => {
    users.push(id, req.body.username, req.body.password);
    id++;
    req.session.user.username = req.body.username;
    res.status(200).json(req.session.user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  getUser: (req, res, next) => {
    res.status(200).json(req.session.user);
  }
};
