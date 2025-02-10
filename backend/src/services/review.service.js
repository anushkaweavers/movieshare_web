const Review = require("../models/review.model"); 

exports.createReview = async (reviewData) => {
  try {
    console.log("📌 Saving Review Data to Database...", reviewData);

    const review = new Review(reviewData);
    await review.save();

    console.log("✅ Review Saved:", review);
    return review; 
  } catch (error) {
    console.error("❌ Error creating review:", error);
    throw new Error("Error creating review");
  }
};
