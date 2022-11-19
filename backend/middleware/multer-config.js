const multer = require('multer');

// get the mime type to add file extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// get and store the file locally
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // file naming
  filename: (req, file, callback) => {
    const fName = file.originalname.split(' ').join('_');
    const name = fName.split('.').slice(0, -1).join('.');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
// module.exports = multer({ storage, fileFilter }).single("image_url");