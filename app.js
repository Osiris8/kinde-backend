require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  setupKinde,
  protectRoute,
  getUser,
} = require("@kinde-oss/kinde-node-express");

const app = express();
const port = 5000;
app.use(express.static("public"));
const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  secret: process.env.KINDE_CLIENT_SECRET,
  redirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
};

app.set("view engine", "pug");
setupKinde(config, app);

app.get("/", (req, res) => {
  if (req.session && req.session.kindeAccessToken) {
    res.redirect("/admin");
  } else {
    res.render("index", {
      title: "Hey",
      message: "Hello there! what would you like to do?",
    });
  }
});

app.get("/admin", protectRoute, getUser, (req, res) => {
  res.render("admin", {
    title: "Admin",
    user: req.user,
  });
});

app.listen(port, function () {
  console.log(`Kinde Express Starter Kit listening on port ${port}!`);
});
