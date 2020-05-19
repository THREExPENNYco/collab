const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config({ path: "../.env" });

AWS.config = new AWS.Config();

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAcesssKey: process.env.AMAZON_ACCESS_KEY,
  region: "us-east-1",
});

let s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_SECRET_KEY,
});

const upLoadCommentImage = (file, fileName) => {
  const config = {
    Key: fileName,
    Bucket: "peerpressurebucket/commentPics",
    Body: file,
  };
  s3.upload(config, function (err, data) {
    if (err) { 
      console.log(err)
    }
    return data.Location;
  });
};

module.exports = { upLoadCommentImage };
