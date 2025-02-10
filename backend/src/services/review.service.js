const Review = require("../models/review.model"); 
const User = require("../models/user.model"); // Correctly import the User model

exports.createReview = async (reviewData) => {
  try {
    console.log("Saving Review Data to Database...", reviewData);


    const user = await User.findById(reviewData.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const review = new Review({
      ...reviewData,
      username: user.username, 
    });

    await review.save();

    console.log("Review Saved:", review);
    return review; 
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Error creating review");
  }
};
exports.getReviewsByMovieId = async (movieId) => {
  try {
    console.log("Fetching Reviews for Movie:", movieId);

    // Fetch reviews and populate the 'username' field from the User model
    const reviews = await Review.find({ movieId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate('userId', 'username'); // Populate only the 'username' field

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Error fetching reviews");
  }
};
