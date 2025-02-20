const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary and returns the URL.
 * @param {string} filePath - The local path of the file to upload.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
const uploadMedia = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // Allows both images & videos
      folder: "community_posts",
    });
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Media upload failed");
  }
};

/**
 * Deletes a file from Cloudinary by its URL.
 * @param {string} fileUrl - The URL of the file to delete.
 */
const deleteMedia = async (fileUrl) => {
  try {
    const publicId = fileUrl.split('/').pop().split('.')[0]; // Extract public_id from URL
    await cloudinary.uploader.destroy(`community_posts/${publicId}`);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

module.exports = { uploadMedia, deleteMedia };
