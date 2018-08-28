require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");

const { checkForSession } = require("./middlewares/checkForSession");

const sc = require("./controllers/swag_controller");
const users = require("./controllers/auth_controller");
const cart = require("./controllers/cart_controller");
const search = require("./controllers/search_controller");

const app = express();

app.use(json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get("/api/swag", sc.read);
app.post("/api/login", users.login);
app.post("/api/register", users.register);
app.post("/api/signout", users.signout);
app.get("/api/user", users.getUser);
app.post("/api/cart", cart.add);
app.post("/api/cart/checkout", cart.checkout);
app.delete("/api/cart", cart.delete);
app.get("/api/search", search.search);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
