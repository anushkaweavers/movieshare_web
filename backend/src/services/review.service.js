const Review = require("../models/review.model");
const User = require("../models/user.model");

// Create Review (WITHOUT storing username)
exports.createReview = async (reviewData) => {
  try {
    console.log("Saving Review Data to Database...", reviewData);

    // Ensure the user exists
    const user = await User.findById(reviewData.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Create review without storing username
    const review = new Review({
      ...reviewData, // Keep only userId
    });

    await review.save();

    console.log("Review Saved:", review);
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Error creating review");
  }
};

// Get Reviews and Populate with Username Instead of userId
exports.getReviewsByMovieId = async (movieId) => {
  try {
    console.log("Fetching Reviews for Movie:", movieId);

    // Fetch reviews and replace userId with username
    const reviews = await Review.find({ movieId })
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "username" }); // Populate only username

    return reviews.map((review) => ({
      _id: review._id,
      movieId: review.movieId,
      review_title: review.review_title,
      review_details: review.review_details,
      tags: review.tags,
      generalScore: review.generalScore,
      plotScore: review.plotScore,
      storyScore: review.storyScore,
      characterScore: review.characterScore,
      cinematographyScore: review.cinematographyScore,
      rateScore: review.rateScore,
      createdAt: review.createdAt,
      username: review.userId?.username, // Replace userId with username
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Error fetching reviews");
  }
};
