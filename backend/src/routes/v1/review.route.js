// Import required modules
const express = require("express");
const reviewController = require("../../controllers/review.controller");

const router = express.Router();

// Create a new review
router.post("/create", reviewController.createReview);

// Get all reviews for a movie
router.get("/movie/:movieId", reviewController.getReviewsByMovieId);

// Get a specific review by reviewId
router.get("/:reviewId", reviewController.getReviewById);

// Edit an existing review by ID
router.put("/:reviewId", reviewController.updateReview);

// ✅ Add Delete Review Route
router.delete("/:reviewId", reviewController.deleteReview); // <-- New DELETE route

module.exports = router;
