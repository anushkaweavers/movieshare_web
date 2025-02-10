const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const reviewService = require("../services/review.service");

const createReview = catchAsync(async (req, res) => {
  console.log("Authenticated User:", req.user); // Logs user info

  if (!req.user || !req.user.id) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "User not authenticated!" });
  }

  // Extract review data
  const { movieId, review_title, review_details, tags, generalScore, plotScore, storyScore, characterScore, cinematographyScore, rateScore } = req.body;

  if (!movieId || !review_title || !review_details) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields" });
  }

  const reviewData = { 
    userId: req.user.id, 
    movieId,
    review_title,
    review_details,
    tags,
    generalScore,
    plotScore,
    storyScore,
    characterScore,
    cinematographyScore,
    rateScore,
  };

  console.log("Incoming Review Data:", reviewData);

  const review = await reviewService.createReview(reviewData);
  res.status(httpStatus.CREATED).json(review);
});

module.exports = { createReview };
const getReviewsByMovieId = catchAsync(async (req, res) => {
  const { movieId } = req.params;

  if (!movieId) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Movie ID is required" });
  }

  const reviews = await reviewService.getReviewsByMovieId(movieId);

  if (!reviews || reviews.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "No reviews found for this movie" });
  }

  res.status(httpStatus.OK).json({ reviews });
});

module.exports = { createReview, getReviewsByMovieId };