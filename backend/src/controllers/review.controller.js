const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const reviewService = require("../services/review.service");

const createReview = catchAsync(async (req, res) => {
  try {
    const {
      userId, movieId, review_title, review_details, tags = [],
      generalScore, plotScore, storyScore, characterScore, cinematographyScore, rateScore
    } = req.body;

    if (!userId || !movieId || !review_title || !review_details) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    const reviewData = { userId, movieId, review_title, review_details, tags, generalScore, plotScore, storyScore, characterScore, cinematographyScore, rateScore };
    const review = await reviewService.createReview(reviewData);
    
    return res.status(httpStatus.CREATED).json(review);
  } catch (error) {
    console.error("Error creating review:", error); 
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message || "Error creating review" });
  }
});

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