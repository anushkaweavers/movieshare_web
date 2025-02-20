import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia, Chip, IconButton, Grid, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { AddPhotoAlternate, Edit, Delete, Save, Cancel } from '@mui/icons-material';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [showForm, setShowForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      const response = await axiosCustom.get('/posts');
      const sortedPosts = sortPosts(response.data, sortBy);
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const sortPosts = (posts, sortBy) => {
    return posts.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'anushka');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dqwb01qwt/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Cloudinary upload failed");

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };
  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setIsLoading(true);
      try {
        const uploadedUrl = await uploadToCloudinary(file);
        setMediaUrl(uploadedUrl);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleCreateOrUpdatePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    const postData = {
      title,
      content,
      tags: Array.isArray(tags) ? tags : [tags],
      mediaFile: mediaUrl,
      userId,
    };

    try {
      if (editingPostId) {
        await axiosCustom.put(`/posts/${editingPostId}`, postData);
      } else {
        await axiosCustom.post("/posts", postData);
      }
      fetchPosts();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditPost = (post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags);
    setMediaUrl(post.mediaFile);
    setPreviewUrl(post.mediaFile);
  };
  const handleCancelEdit = () => {
    setEditingPostId(null);
    resetForm();
  };
  const handleDeletePost = async (postId) => {
    try {
      await axiosCustom.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setMediaFile(null);
    setPreviewUrl(null);
    setEditingPostId(null);
    setMediaUrl(null);
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="community-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>Community</Typography>
          <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sort By">
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button 
          variant="contained" 
          onClick={() => setShowForm(!showForm)} 
          sx={{ mb: 2, backgroundColor: '#7b1fa2', '&:hover': { backgroundColor: '#6a1b9a' } }}
        >
          {showForm ? 'Cancel' : 'Write a Post'}
        </Button>

        {showForm && (
          <form onSubmit={handleCreateOrUpdatePost} className="form-container">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <input type="file" accept="image/*,video/*" onChange={handleMediaChange} hidden id="media-upload" />
                <label htmlFor="media-upload">
                  <IconButton component="span">
                    <AddPhotoAlternate />
                  </IconButton>
                  Upload Media
                </label>
                {previewUrl && (
                  <CardMedia
                    component="img"
                    className="form-media-preview"
                    image={previewUrl}
                    alt="Preview"
                  />
                )}
                {isLoading && <CircularProgress />}
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
                <TextField label="Details" fullWidth multiline rows={3} value={content} onChange={(e) => setContent(e.target.value)} margin="normal" />

                <TextField label="Add Tag" fullWidth margin="normal" onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    setTags([...tags, e.target.value.trim()]);
                    e.target.value = '';
                  }
                }} />

                <div className="post-tags">
                  {tags.map((tag, index) => (
                    <Chip key={index} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
                  ))}
                </div>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={isLoading}
                    sx={{ backgroundColor: '#7b1fa2', '&:hover': { backgroundColor: '#6a1b9a' } }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : editingPostId ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        )}
        {posts.map((post) => (
          <Card key={post._id} className="post-card">
            <Grid container>
              {post.mediaFile && (
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    className="post-media"
                    image={post.mediaFile}
                    alt="Post Media"
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={post.mediaFile ? 8 : 12}>
                <CardContent className="post-content">
                  {editingPostId === post._id ? (
                    
                    <>
                      <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                      />
                      <TextField
                        label="Details"
                        fullWidth
                        multiline
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                      />
                      <TextField 
                        label="Add Tag" 
                        fullWidth 
                        margin="normal" 
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            e.preventDefault();
                            setTags([...tags, e.target.value.trim()]);
                            e.target.value = '';
                          }
                        }} 
                      />
                      <div className="post-tags">
                        {tags.map((tag, index) => (
                          <Chip key={index} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
                        ))}
                      </div>
                      <div className="post-actions">
                        <IconButton onClick={handleCreateOrUpdatePost}>
                          <Save />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <Cancel />
                        </IconButton>
                      </div>
                    </>
                  ) : (
                    // Display post content
                    <>
                      <Typography variant="h6" className="post-title">{post.title}</Typography>
                      <Typography className="post-details">{post.content}</Typography>
                      <div className="post-tags">
                        {post.tags.map((tag, index) => (
                          <Chip key={index} label={tag} style={{ marginRight: '5px', marginBottom: '5px' }} />
                        ))}
                      </div>
                      <div className="post-actions">
                        <IconButton onClick={() => handleEditPost(post)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePost(post._id)}>
                          <Delete />
                        </IconButton>
                      </div>
                    </>
                  )}
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