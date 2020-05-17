const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config({ path: "../.env" });

AWS.config = new AWS.Config();
console.log(process.env.AMAZON_ACCESS_KEY)
AWS.config.update({ 
    accessKeyId: process.env.AMAZON_ACCESS_KEY, 
    secretAcesssKey: process.env.AMAZON_ACCESS_KEY, 
    "region": "us-east-1"
}); 

let file = "input_camera_img.png";

let s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_SECRET_KEY,
});

const config = {
  Key: path.basename(file),
  Bucket: "peerpressurebucket/commentPics",
  Body: fs.createReadStream(file),
};

s3.upload(config, function (err, data) {
  if (err) throw new err; 
  return data.Location;
});
