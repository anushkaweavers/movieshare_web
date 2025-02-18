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
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    setIsLoading(true);
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('movieTitle', selectedMovieTitle);
    formData.append('tags', JSON.stringify(tags));
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('userId', userId);
    if (mediaFile) formData.append('mediaFile', mediaFile);

    try {
      const response = await axiosCustom.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        fetchPosts();
        setShowForm(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const formData = new FormData();
    formData.append('movieTitle', selectedMovieTitle);
    formData.append('tags', JSON.stringify(tags));
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    if (mediaFile) formData.append('mediaFile', mediaFile);

    try {
      const response = await axiosCustom.put(`/posts/${editingPost._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        fetchPosts();
        setShowForm(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setRating(0);
    setTags([]);
    setMediaFile(null);
    setPreviewUrl(null);
    setSelectedMovieTitle('');
    setEditingPost(null);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
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

  const handleEditButtonClick = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setRating(post.rating);
    setTags(post.tags);
    setSelectedMovieTitle(post.movieTitle);
    setPreviewUrl(post.mediaFile ? `http://localhost:3000/uploads/${post.mediaFile.split('/').pop()}` : null);
    setShowForm(true);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="community-container">
        <Typography variant="h4" gutterBottom>Community</Typography>

        <FormControl variant="outlined" size="small" sx={{ float: 'right', mb: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={() => setShowForm(!showForm)} sx={{ mb: 2 }}>
          {showForm ? 'Cancel' : 'Write a Post'}
        </Button>

        {showForm && (
          <form onSubmit={editingPost ? handleEditPost : handleCreatePost} className="community-form">
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
                {editingPost ? (
                  <TextField
                    label="Movie Title"
                    variant="outlined"
                    fullWidth
                    value={selectedMovieTitle}
                    disabled
                    margin="normal"
                  />
                ) : (
                  <Autocomplete
                    className="movie-autocomplete"
                    freeSolo
                    options={movieResults}
                    getOptionLabel={(option) => option.title || ''}
                    onInputChange={(event, newInputValue) => setMovieSearchTerm(newInputValue)}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedMovieTitle(newValue.title);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search for a movie (TMDB)" variant="outlined" fullWidth margin="normal" />
                    )}
                  />
                )}
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
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        {sortedPosts.map((post) => (
          <Card key={post._id} className="post-card">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {post.mediaFile && (
                  <CardMedia component="img" height="200" image={`http://localhost:3000/uploads/${post.mediaFile}`} alt={post.title} />
                )}
              </Grid>
              <Grid item xs={8}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.content}</Typography>
                  <Typography variant="body2">
                    Rating: {post.rating}/10 <Star fontSize="small" />
                  </Typography>
                  <Typography variant="body2">
                    Movie: {post.movieTitle}
                  </Typography>
                  <div className="tags-container">
                    {post.tags.map((tag, index) => (
                      <Chip key={index} label={tag} sx={{ margin: 0.5, backgroundColor: 'red', color: 'white' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <IconButton aria-label="edit" onClick={() => handleEditButtonClick(post)}>
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