const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const sessions = require("express-session");
const FileStore = require("session-file-store")(sessions);
const AWS = require("aws-sdk");
const multer = require("multer"); 
const multerS3 = require("multer-s3");
const { Comment } = require("./models/Comment.js");
const { User } = require("./models/User.js");

require("dotenv").config({ path: "../.env" });

const cors = require("cors");
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

AWS.config = new AWS.Config();

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAcesssKey: process.env.AMAZON_ACCESS_KEY,
  region: "us-east-1",
});

let s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_SECRET_KEY
});

const commentImageUpload = multer({ 
  storage: multerS3({ 
    s3: s3, 
    bucket: "peerpressurebucket/commentPics",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) { 
      cb(null, file.originalname)
    }
  })
})

const dashboardImageUpload = multer({ 
  storage: multerS3({ 
    s3: s3, 
    bucket: "peerpressurebucket/profilePics", 
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    key: function(req, file, cb) { 
      cb(null, file.originalname)
    }
  })
})

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
      resave: false,
      saveUninitialized: false,
      domain: ".salty-basin-04868.herokuapp.com",
      path: "/",
      maxAge: 60 * 24 * 60 * 60 * 1000,
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
app.post("/group_dashboard/group_id=:group_id/create_comment", commentImageUpload.single("image"), function(req, res, next) { 
  const text = req.body.text;
  const image = req.file ? req.file.location : "";
  const newComment = new Comment({
    createdBy: { 
      userId: req.session.userId,
      userName: req.session.userName
    },
    group: req.params.group_id,
    image: image,
    text: text,
  });
  newComment
    .save()
    .then((newComment) => res.status(200).json(newComment))
    .catch((err) => res.status(404).json(err));
})

app.post("/dashboard/upload_image/:userId", dashboardImageUpload.single("image"), function(req, res, next) { 
  User.findById(req.params.userId, function(err, doc) { 
    err ? res.status(400).json(err) : null; 
    doc.image = req.file.location;
    res.status(200).json(doc.image);
  })
})

app.listen(port, () => {
  console.log(`You\'re listening on: ${port}`);
});
