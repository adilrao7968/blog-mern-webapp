const multer = require("multer");
const randomString = require("randomstring");
const path = require("path");

function checkFileType(file, cb) {
  const allowedType = /jpeg|png|jpg|gif/;

  const isMatchExt = allowedType.test(
    path.extname(file.originalname).toLowerCase()
  );

  const isMIMEMatch = allowedType.test(file.mimetype);

  if (isMatchExt && isMIMEMatch) {
    cb(null, true);
  } else {
    cb("Error: File type not supported");
  }
}

function handlePostImages(name) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/postImages");
    },
    filename: (req, file, cb) => {
      let p1 = randomString.generate(5);
      let p2 = randomString.generate(5);
      let extName = path.extname(file.originalname).toLowerCase();
      cb(null, `${p1}_${p2}${extName}`);
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 1000000 * 10,
    },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single(name);
}

module.exports = {
  handlePostImages,
};
