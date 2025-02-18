const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory
const uploadDir = path.join(__dirname, '../../uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and the original file name
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

// Multer middleware
const upload = multer({ storage });

module.exports = upload;
