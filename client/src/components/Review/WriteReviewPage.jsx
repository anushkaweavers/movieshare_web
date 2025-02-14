import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Rating, Box, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../Navbar/Navbar";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { useSelector } from "react-redux";
import "./WriteReviewPage.css";

const WriteReviewPage = () => {
  const { state } = useLocation();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = state?.movie || { title: "Unknown", poster_path: "" };
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (field, value) => {
    if (field.includes("Score")) {
      const numericValue = Math.min(10, Math.max(0, Number(value)));
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
    setReview((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handlePostReview = async () => {
    try {
      if (!user || !user._id) {
        setDialogOpen(true);
        return;
      }

      const reviewData = {
        userId: user._id,
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

      await axiosCustom.post("/reviews/create", reviewData);
      setDialogOpen(true);
    } catch (error) {
      setDialogOpen(true);
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
                  <TextField fullWidth variant="outlined" value={movie.title} disabled />
                </div>
                <div className="field-group">
                  <label className="field-label">Review Title</label>
                  <TextField fullWidth variant="outlined" placeholder="Enter review title" onChange={(e) => handleChange("title", e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Review</label>
                  <TextField fullWidth multiline rows={4} variant="outlined" placeholder="Write your review..." onChange={(e) => handleChange("content", e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Add Tags</label>
                  <Box className="tag-input-box">
                    <TextField fullWidth variant="outlined" placeholder="Type tag and press +" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }} />
                    <IconButton onClick={handleAddTag}><AddIcon /></IconButton>
                  </Box>
                  <Box>
                    {review.tags.map((tag, index) => (
                      <Chip key={index} label={tag} onDelete={() => handleRemoveTag(tag)} />
                    ))}
                  </Box>
                </div>
              </div>
            </div>
            <Box className="rating-section">
              <h3 className="rating-header">General Score</h3>
              <Rating value={review.generalScore} max={10} precision={0.5} onChange={(e, newValue) => handleChange("generalScore", newValue || 0)} />
            </Box>
            <Box className="rating-grid">
              {["plotScore", "storyScore", "characterScore", "cinematographyScore", "rateScore"].map((key) => (
                <div key={key} className="rating-box">
                  <p className="rating-label">{key.replace("Score", "")}</p>
                  <TextField fullWidth variant="outlined" type="number" placeholder="0-10" value={review[key]} onChange={(e) => handleChange(key, e.target.value)} inputProps={{ min: 0, max: 10, step: 0.5 }} />
                </div>
              ))}
            </Box>
            <Box className="button-container">
              <Button variant="contained" onClick={() => navigate(-1)}>Cancel</Button>
              <Button variant="contained" onClick={handlePostReview}>Post</Button>
            </Box>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Review Submission</DialogTitle>
        <DialogContent>{user ? "Review posted successfully!" : "User not found! Please log in."}</DialogContent>
        <DialogActions>
          <Button onClick={() => { setDialogOpen(false); if (user) navigate(-1); }}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WriteReviewPage;
