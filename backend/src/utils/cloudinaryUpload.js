const cloudinary = require('../config/cloudinary'); // ✅ Ensure Cloudinary is properly configured
const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory before uploading
const upload = multer({ storage });

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) return next(); // No file uploaded

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, 
      (error, uploadedFile) => {
        if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });
        req.fileUrl = uploadedFile.secure_url; // Save URL to request object
        next();
      }
    ).end(req.file.buffer); // Stream file from memory
  } catch (error) {
    return res.status(500).json({ error: 'File upload failed' });
  }
};

module.exports = upload.single('mediaFile'), uploadToCloudinary;
