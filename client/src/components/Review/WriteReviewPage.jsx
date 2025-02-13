import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Rating, Box, IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../Navbar/Navbar";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { useSelector } from "react-redux";  // Import useSelector
import "./WriteReviewPage.css";

const WriteReviewPage = () => {
  const { state } = useLocation();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = state?.movie || { title: "Unknown", poster_path: "" };

  // Get user from Redux store
  const user = useSelector((state) => state.user.user);

  const [review, setReview] = useState({
    title: "",
    content: "",
    tags: [],
    generalScore: 0,
    plotScore: 0,
    storyScore: 0,
    characterScore: 0,
    cinematographyScore: 0,
    rateScore: 0,
  });

  const [tagInput, setTagInput] = useState("");
  
  const handleChange = (field, value) => {
    if (field.includes("Score")) {
      const numericValue = Math.min(10, Math.max(0, Number(value))); // Ensure within range
      setReview((prev) => ({ ...prev, [field]: numericValue }));
    } else {
      setReview((prev) => ({ ...prev, [field]: value }));
    }
  };
  
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !review.tags.includes(trimmedTag)) {
      setReview((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    setReview((prev) => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handlePostReview = async () => {
    try {
      if (!user || !user._id) {
        alert("User not found! Please log in.");
        return;
      }
  
      const reviewData = {
        userId: user._id, // Send user ID from Redux
        movieId,
        review_title: review.title,
        review_details: review.content,
        tags: review.tags,
        generalScore: review.generalScore,
        plotScore: review.plotScore,
        storyScore: review.storyScore,
        characterScore: review.characterScore,
        cinematographyScore: review.cinematographyScore,
        rateScore: review.rateScore,
      };
  
      const response = await axiosCustom.post("/reviews/create", reviewData);
      alert("Review posted successfully!");
      navigate(-1);
    } catch (error) {
      alert("Failed to post review. Please try again.");
    }
  };
  
  return (
    <>
      <Navbar />
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
                  <label className="field-label">Add Tags</label>
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
                  <Box className="tags-display-box">
                    {review.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                        style={{ margin: "2px", backgroundColor: "#69396c", color: "#fff" }}
                      />
                    ))}
                  </Box>
                </div>
              </div>
            </div>
            <Box className="rating-section">
              <h3 className="rating-header">General Score</h3>
              <div className="rating-box general-score-box">
              <Rating
  value={review.generalScore}
  max={10}
  precision={0.5} // Allow half-star ratings
  onChange={(e, newValue) => handleChange("generalScore", newValue || 0)}
/>

                <span className="score-label">{review.generalScore}/10</span>
              </div>
            </Box>
            <Box className="rating-grid">
  {[
    { key: "plotScore", label: "Plot" },
    { key: "storyScore", label: "Story" },
    { key: "characterScore", label: "Characters" },
    { key: "cinematographyScore", label: "Cinematography" },
    { key: "rateScore", label: "Rate" },
  ].map(({ key, label }) => (
    <div key={key} className="rating-box">
      <p className="rating-label">{label}</p>
      <TextField
        fullWidth
        variant="outlined"
        type="number"
        placeholder="0-10"
        value={review[key]} // Make sure the input reflects the current state
        onChange={(e) => handleChange(key, e.target.value)}
        className="numeric-rating"
        inputProps={{ min: 0, max: 10, step: 0.5 }}
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
