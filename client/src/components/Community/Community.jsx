import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Autocomplete,
  Chip,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating
} from '@mui/material';
import { AddPhotoAlternate, Star, Edit, Delete } from '@mui/icons-material';
import './Community.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [movieSearchTerm, setMovieSearchTerm] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (movieSearchTerm.trim()) {
      handleMovieSearch(movieSearchTerm);
    } else {
      setMovieResults([]);
    }
  }, [movieSearchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await axiosCustom.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  
  const handleMovieSearch = async (term) => {
    try {
      const response = await apiClient.get('/search/movie', { params: { query: term } });
      setMovieResults(response.data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
  
    const userId = localStorage.getItem('userId'); // Retrieve the userId (adjust based on your auth logic)
  
    const formData = new FormData();
    formData.append('movieTitle', selectedMovieTitle);
    formData.append('tags', JSON.stringify(tags));
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('userId', userId); // Add userId to the request
    if (mediaFile) formData.append('mediaFile', mediaFile);
  
    try {
      const response = await axiosCustom.post('/posts', formData);
      if (response.status === 201) {
        fetchPosts(); 
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleDeletePost = async (postId) => {
    try {
      await axiosCustom.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="community-container">
        <Typography variant="h4" gutterBottom>Community</Typography>

        {/* Sorting Dropdown */}
        <FormControl variant="outlined" size="small" sx={{ float: 'right', mb: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        <form onSubmit={handleCreatePost} className="community-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} hidden id="media-upload" />
              <label htmlFor="media-upload" className="upload-label">
                <IconButton component="span">
                  <AddPhotoAlternate />
                </IconButton>
                Upload Media
              </label>
              {previewUrl && (
                <CardMedia component="img" height="200" image={previewUrl} alt="Preview" className="upload-preview" />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                className="movie-autocomplete"
                freeSolo
                options={movieResults}
                getOptionLabel={(option) => option.title || ''}
                onInputChange={(event, newInputValue) => setMovieSearchTerm(newInputValue)}
                onChange={(event, newValue) => setSelectedMovieTitle(newValue ? newValue.title : '')}
                renderInput={(params) => (
                  <TextField {...params} label="Search for a movie (TMDB)" variant="outlined" fullWidth margin="normal" />
                )}
              />
              <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
              <TextField label="Details" variant="outlined" fullWidth multiline rows={3} value={content} onChange={(e) => setContent(e.target.value)} margin="normal" />

              <Typography variant="body2" sx={{ mt: 2 }}>Rate the Movie:</Typography>
              <Rating
                name="post-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                max={10}
              />

              <TextField label="Add Tag" variant="outlined" fullWidth margin="normal" onKeyPress={handleTagKeyPress} />
              <div className="tags-container">
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} onDelete={() => handleRemoveTag(tag)} sx={{ margin: 0.5 }} />
                ))}
              </div>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create Post</Button>
            </Grid>
          </Grid>
        </form>

        {sortedPosts.map((post) => (
  <Card key={post._id} className="post-card">
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {post.mediaFile && <CardMedia component="img" height="200" image={`http://localhost:3000/${post.mediaFile}`} alt={post.title} className="post-image" />}
      </Grid>
      <Grid item xs={8}>
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2">{post.content}</Typography>
          <Typography variant="body2">
            Rating: {post.rating}/10 <Star fontSize="small" />
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <IconButton aria-label="edit" onClick={() => console.log('Edit post:', post._id)}>
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeletePost(post._id)}>
              <Delete />
            </IconButton>
          </div>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
))}

      </Container>
    </>
  );
};

export default Community;