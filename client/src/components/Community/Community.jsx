import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia, Chip, IconButton, Grid, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { AddPhotoAlternate, Edit, Delete } from '@mui/icons-material';
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
  const [editingPost, setEditingPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosCustom.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
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
      console.log("Cloudinary Response:", data); // Log the Cloudinary response
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
      tags: Array.isArray(tags) ? tags : [tags], // Ensure tags is an array
      mediaFile: mediaUrl, // Cloudinary URL
      userId,
    };
  
    console.log("Post Data Sent to Backend:", postData); // ✅ Debugging log
  
    try {
      if (editingPost) {
        await axiosCustom.put(`/posts/${editingPost._id}`, postData);
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
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags);
    setMediaUrl(post.mediaFile);
    setPreviewUrl(post.mediaFile);
    setShowForm(true);
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
    setEditingPost(null);
    setMediaUrl(null);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>Community</Typography>

        <Button variant="contained" onClick={() => setShowForm(!showForm)} sx={{ mb: 2 }}>
          {showForm ? 'Cancel' : 'Write a Post'}
        </Button>

        {showForm && (
          <form onSubmit={handleCreateOrUpdatePost}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input type="file" accept="image/*,video/*" onChange={handleMediaChange} hidden id="media-upload" />
                <label htmlFor="media-upload">
                  <IconButton component="span">
                    <AddPhotoAlternate />
                  </IconButton>
                  Upload Media
                </label>
                {previewUrl && <CardMedia component="img" height="200" image={previewUrl} alt="Preview" />}
                {isLoading && <CircularProgress />}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
                <TextField label="Details" fullWidth multiline rows={3} value={content} onChange={(e) => setContent(e.target.value)} margin="normal" />

                <TextField label="Add Tag" fullWidth margin="normal" onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    setTags([...tags, e.target.value.trim()]);
                    e.target.value = '';
                  }
                }} />

                <div>
                  {tags.map((tag, index) => (
                    <Chip key={index} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
                  ))}
                </div>

                <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : editingPost ? 'Update Post' : 'Create Post'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        {posts.map((post) => (
          <Card key={post._id}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.content}</Typography>
              {post.mediaFile && <CardMedia component="img" height="200" image={post.mediaFile} alt="Post Media" />}
              <IconButton onClick={() => handleEditPost(post)}><Edit /></IconButton>
              <IconButton onClick={() => handleDeletePost(post._id)}><Delete /></IconButton>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Community;
