require("dotenv").config();

var multer = require('multer');
var multerS3 = require('multer-s3');

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    key: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
  }),
  fileFilter:  function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  }
})

module.exports = upload;