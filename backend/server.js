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
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
      domain: ".salty-basin-04868.herokuapp.com",
      path: "/",
      maxAge: 60000,
      secure: false,
    },
  })
);

const newUserRoute = require("./userRoutes.js");
app.use("/", newUserRoute);
app.set("etag", false);
app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`You\'re listening on: ${port}`);
});
