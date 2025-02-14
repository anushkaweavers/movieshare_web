const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const reviewService = require("../services/review.service");
const Review = require("../models/review.model"); // Ensure correct path


// Controller for creating a review
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

// Controller for getting reviews by movie ID
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

const getReviewById = catchAsync(async (req, res) => {
  const { reviewId } = req.params;

  const review = await reviewService.getReviewById(reviewId);

  if (!review) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Review not found" });
  }

  res.status(httpStatus.OK).json(review);
});

// Controller for updating a review by reviewId
const updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const { review_title, review_details, tags, generalScore, plotScore, storyScore, characterScore, cinematographyScore, rateScore } = req.body;

  const review = await reviewService.updateReview(reviewId, {
    review_title, review_details, tags, generalScore, plotScore, storyScore, characterScore, cinematographyScore, rateScore
  });

  if (!review) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Review not found or unable to update" });
  }

  res.status(httpStatus.OK).json({ message: "Review updated successfully", review });
});

// Delete review by ID
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error. Unable to delete review." });
  }
};

module.exports = { createReview, getReviewsByMovieId, getReviewById, updateReview ,deleteReview};