import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Rating, Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../Navbar/Navbar";
import "./WriteReviewPage.css"; 

const WriteReviewPage = () => {
  const { state } = useLocation();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = state?.movie || { title: "Unknown", poster_path: "" };

  const [review, setReview] = useState({
    title: "",
    content: "",
    tags: [],
    generalScore: 0,
    plot: "",
    story: "",
    characters: "",
    cinematography: "",
    rate: ""
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !review.tags.includes(trimmedTag)) {
      setReview((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
    }
    setTagInput("");
  };

  const handlePostReview = () => {
    console.log("Review Posted:", review);
    navigate(-1);
  };

  return (
    <>
      <Navbar />  {/* Navbar is separate and spans the full width */}
      <div className="write-review-wrapper">
        <div className="review-page-container">
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
                <div className="field-group">
                  <label className="field-label">Movie Name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={movie.title}
                    disabled
                    className="input-field movie-name-field"
                    InputProps={{ readOnly: true }}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Review Title</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter review title"
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Review</label>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Write your review..."
                    onChange={(e) => handleChange("content", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Add Tag</label>
                  <Box className="tag-input-box">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type tag and press +"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="input-field"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <IconButton className="tag-add-btn" onClick={handleAddTag}>
                      <AddIcon style={{ color: "#f0f0f0" }} />
                    </IconButton>
                  </Box>
                  {review.tags.length > 0 && (
                    <Box className="tags-display">
                      {review.tags.map((tag, index) => (
                        <span key={index} className="tag-chip">{tag}</span>
                      ))}
                    </Box>
                  )}
                </div>
              </div>
            </div>
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
            <Box className="button-container">
              <Button 
                variant="contained" 
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                className="post-button"
                onClick={handlePostReview}
              >
                Post
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReviewPage;
