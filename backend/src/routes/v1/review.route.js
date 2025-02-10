const express = require("express");
const passport = require("passport");
const reviewController = require("../../controllers/review.controller");

const router = express.Router();

// Route to create a review
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  reviewController.createReview
);

// Route to get reviews by movieId
router.get("/movie/:movieId", reviewController.getReviewsByMovieId);

module.exports = router;
