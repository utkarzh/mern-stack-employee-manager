const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up Multer with S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // Set the ACL to 'public-read'
    key: function (req, file, cb) {
      const fileExtension = file.originalname.split(".").pop();
      cb(null, `${Date.now().toString()}.${fileExtension}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
    next();
  });
};
