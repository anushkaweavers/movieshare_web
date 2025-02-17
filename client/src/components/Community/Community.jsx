import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Autocomplete,
  Chip,
  IconButton,
  Grid
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
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
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      setPosts(await response.json());
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

    const formData = new FormData();
    formData.append('movieTitle', selectedMovieTitle);
    formData.append('tags', JSON.stringify(tags));
    formData.append('title', title);
    formData.append('content', content);
    if (mediaFile) formData.append('mediaFile', mediaFile);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create post');
      setSelectedMovieTitle('');
      setTags([]);
      setTitle('');
      setContent('');
      setMediaFile(null);
      setPreviewUrl(null);
      setMovieSearchTerm('');
      setMovieResults([]);
      fetchPosts();
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

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="community-container">
        <Typography variant="h4" gutterBottom>Community</Typography>
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
        {posts.map((post) => (
          <Card key={post.id} className="post-card">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CardMedia component="img" height="200" image={post.mediaUrl} alt={post.title} className="post-image" />
              </Grid>
              <Grid item xs={8}>
                <CardContent>
                  {post.movieTitle && <Typography variant="subtitle1">Movie: {post.movieTitle}</Typography>}
                  {post.tags && <Typography variant="body2">Tags: {post.tags.join(', ')}</Typography>}
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.content}</Typography>
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
