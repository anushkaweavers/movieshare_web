const express = require("express");
const passport = require("passport");
const reviewController = require("../../controllers/review.controller");

const router = express.Router();

router.post("/create", reviewController.createReview);


router.get("/movie/:movieId", reviewController.getReviewsByMovieId);

// Get a specific review by reviewId
router.get("/:reviewId", reviewController.getReviewById); // <-- Add this line

// Edit an existing review by ID
router.put("/:reviewId", reviewController.updateReview);
module.exports = router;

