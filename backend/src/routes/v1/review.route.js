const express = require("express");
const passport = require("passport");
const reviewController = require("../../controllers/review.controller");

const router = express.Router();

router.post("/create", reviewController.createReview);


router.get("/movie/:movieId", reviewController.getReviewsByMovieId);

module.exports = router;
