import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Rating, Box } from "@mui/material";
import "./WriteReviewPage.css"; 

const WriteReviewPage = () => {
  const { state } = useLocation(); // Get movie details from navigation
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = state?.movie || { title: "Unknown", poster_path: "" }; //fallback

  const [review, setReview] = useState({
    title: "",
    content: "",
    tags: "",
    generalScore:0,
  });

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handlePostReview = () => {
    console.log("Review Posted:", review);
    navigate(-1); // Go back to previous page after posting
  };

  return (
    <div className="review-page">
      <h2 className="review-header">Write a Review</h2>
      <div className="review-container">
        <div className="poster-box">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="review-poster"
          />
        </div>
        <div className="details-box">
          <TextField
            fullWidth
            variant="outlined"
            label="Movie Name"
            value={movie.title}
            disabled
            className="movie-name-field"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Review Title"
            onChange={(e) => handleChange("title", e.target.value)}
            className="input-field"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Review"
            onChange={(e) => handleChange("content", e.target.value)}
            className="input-field"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Add a Tag"
            onChange={(e) => handleChange("tags", e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      {/* General Score */}
      <Box className="rating-section">
        <h3 className="rating-header">General Score</h3>
        <div className="rating-box general-score-box">
          <Rating
            value={review.generalScore}
            max={10}
            onChange={(e, newValue) => handleChange("generalScore", newValue)}
          />
          <span className="score-label">{review.generalScore}/10</span>
        </div>
      </Box>
      {/* Detailed Ratings */}
      <Box className="rating-grid">
        {["plot", "story", "characters", "cinematography", "rate"].map((category) => (
          <div key={category} className="rating-box">
            <p className="rating-label">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="0/10"
              onChange={(e) => handleChange(category, e.target.value)}
              className="numeric-rating"
            />
          </div>
        ))}
      </Box>
      {/* Buttons */}
      <Box className="button-container">
        <Button 
          variant="contained" 
          color="error" 
          className="cancel-button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          className="post-button"
          onClick={handlePostReview}
        >
          Post
        </Button>
      </Box>
    </div>
  );
};

export default WriteReviewPage;
