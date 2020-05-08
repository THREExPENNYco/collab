const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const sessions = require("express-session");
const FileStore = require("session-file-store")(sessions);

require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

mongoose.set("useFindAndModify", false);
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once("open", () => {
  console.log("connected");
});
// session must be above routes if sessions are needed for routes
app.use(
  sessions({
    store: new FileStore(),
    name: "session",
    secret: process.env.ACCESS_TOKEN,
    resave: true,
    saveUninitialized: false,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    cookie: {
      domain: ".app.127.0.0.1:8080",
      maxAge: 60000,
      sameSite: "None",
      secure: false,
    },
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.header("Access-Control-Request-Method", "POST, GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
const newUserRoute = require("./userRoutes.js");
app.use("/", newUserRoute);
app.get("/*", function (req, res) {
  res.sendFile(path.resolve("../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.listen(port, () => {
  console.log(`You\'re listening on: ${port}`);
});
