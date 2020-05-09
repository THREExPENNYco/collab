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
const mongoUri = process.env.MONGODB_URI;
console.log(mongoUri);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

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
    duration: 24 * 60 * 60 * 1000,
    cookie: {
      resave: true,
      saveUninitialized: true,
      domain: "localhost.com",
      path: "/",
      maxAge: 60000,
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

console.log(path.join('dist', 'index.html'));
const newUserRoute = require("./userRoutes.js");
app.use("/", newUserRoute);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (res, req) => {
    res.sendFile(path.resolve('collab/dist/index.html'));
  });
}
const hostname = "localhost"
const server = app.listen(port, hostname, () => {
  const host = server.address().address;
  console.log(`You\'re listening on: ${port} and host: ${host}`);
});
