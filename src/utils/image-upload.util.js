const multer = require("multer");
const logger = require("@utils/logger.utils");

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const fileFilterProfile = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please add only image"), false);
  }
};

const FILE_SIZE = 2 * 1024 * 1024
const storage = () =>
  multer.memoryStorage({
    limits: FILE_SIZE,
  });
const upload = multer({
  limits: { fileSize: FILE_SIZE }, //2mb
  storage: storage(),
  fileFilter,
}).array("image");
const uploadProfile = multer({
  limits: { fileSize: FILE_SIZE }, //2mb
  storage: storage(),
  fileFilter: fileFilterProfile,
}).single("image");



module.exports = { upload, uploadProfile };