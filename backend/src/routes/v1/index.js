const express = require("express");
const axios = require("axios");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const reviewRoute = require("./review.route");
const postRoute = require("./post.route");

const router = express.Router();

// Default API routes
const defaultRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/users", route: userRoute },
  { path: "/reviews", route: reviewRoute },
  { path: "/posts", route: postRoute },
];

// Register default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
//proxy
router.get("/proxy/image", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ message: "Image URL is required" });

    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

module.exports = router;
