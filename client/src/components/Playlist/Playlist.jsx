import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import Navbar from "../Navbar/Navbar";
import {
  Button,
  TextField,
  Switch,
  IconButton,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Edit, Delete, Add, Close } from "@mui/icons-material";
import "./Playlist.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

const PlaylistPage = ({ playlistId }) => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedMovies, setAddedMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [playlistSaved, setPlaylistSaved] = useState(false);
  const [savedPlaylist, setSavedPlaylist] = useState(null); // Store the saved playlist
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if more results are available

  useEffect(() => {
    if (playlistId) {
      const fetchPlaylist = async () => {
        try {
          const response = await axiosCustom.get(`/playlist/${playlistId}`);
          const playlist = response.data;
          setPlaylistTitle(playlist.playlistTitle);
          setDescription(playlist.description);
          setThumbnail(playlist.thumbnail);
          setIsPrivate(playlist.isPrivate);
          setAddedMovies(playlist.movies);
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
      fetchPlaylist();
    }
  }, [playlistId]);

  useEffect(() => {
    if (searchQuery) {
      // Reset page and search results when search query changes
      setPage(1);
      setSearchResults([]);
      fetchMovies(1);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchMovies = async (pageNumber) => {
    try {
      const response = await apiClient.get(`/search/movie`, {
        params: { query: searchQuery, page: pageNumber },
      });
      const newResults = response.data.results;
      if (newResults.length === 0) {
        setHasMore(false); // No more results
      } else {
        setSearchResults((prevResults) => [...prevResults, ...newResults]); // Append new results
      }
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - (scrollTop + clientHeight) < 100 && hasMore) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page); // Fetch next page of results
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setThumbnail(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddMovie = (movie) => {
    if (!addedMovies.some((m) => m.id === movie.id)) {
      setAddedMovies([...addedMovies, movie]);
    }
  };

  const handleRemoveMovie = (movieId) => {
    setAddedMovies(addedMovies.filter((movie) => movie.id !== movieId));
  };

  const handleSavePlaylist = async () => {
    try {
      const playlistData = {
        playlistTitle,
        description,
        thumbnail,
        isPrivate,
        movies: addedMovies,
      };

      let response;
      if (isEditing && playlistId) {
        // Update existing playlist
        response = await axiosCustom.put(`/playlist/${playlistId}`, playlistData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        // Create new playlist
        response = await axiosCustom.post("/playlist", playlistData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      setSavedPlaylist(response.data); // Set the saved playlist
      setPlaylistSaved(true);
      alert("Playlist saved successfully!");
    } catch (error) {
      console.error("Error saving playlist:", error.response ? error.response.data : error.message);
      alert("Failed to save playlist. Please try again.");
    }
  };

  const handleEditPlaylist = () => {
    setPlaylistSaved(false); // Go back to edit mode
  };

  const handleDeletePlaylist = async () => {
    try {
      await axiosCustom.delete(`/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSavedPlaylist(null); // Clear the saved playlist
      setPlaylistSaved(false);
      alert("Playlist deleted successfully!");
    } catch (error) {
      console.error("Error deleting playlist:", error.response ? error.response.data : error.message);
      alert("Failed to delete playlist. Please try again.");
    }
  };

  return (
    <div className="playlist-page">
      <Navbar />
      <Container>
        {playlistSaved ? (
          <>
            <Typography variant="h4" gutterBottom>
              Saved Playlist
            </Typography>
            {savedPlaylist && (
              <div style={{ width: "90%", margin: "0 auto" }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={savedPlaylist.thumbnail}
                    alt={savedPlaylist.playlistTitle}
                    style={{ objectFit: "cover" }} // Horizontal banner
                  />
                  <CardContent>
                    <Typography variant="h5">{savedPlaylist.playlistTitle}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {savedPlaylist.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={handleEditPlaylist}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={handleDeletePlaylist}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  Movies in Playlist
                </Typography>
                <Grid container spacing={2}>
                  {savedPlaylist.movies.map((movie) => (
                    <Grid item key={movie.id} xs={6} sm={4} md={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                          style={{ objectFit: "cover" }}
                        />
                        <CardContent>
                          <Typography variant="body2">{movie.title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              {isEditing ? "Edit Playlist" : "Create Playlist"}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Playlist Title"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  style={{ display: "none" }}
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload">
                  <Button variant="contained" component="span" sx={{ mb: 2 }}>
                    Upload Thumbnail
                  </Button>
                </label>
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: 16 }} // Horizontal banner
                  />
                )}
                <Typography variant="body1">Private Playlist</Typography>
                <Switch
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  {searchResults.map((movie) => (
                    <Grid item key={movie.id} xs={6} sm={4} md={3}>
                      <Card onClick={() => handleAddMovie(movie)}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                          style={{ objectFit: "cover" }}
                        />
                        <CardContent>
                          <Typography variant="body2">{movie.title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {!hasMore && (
                  <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
                    No more results.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Added Movies
                </Typography>
                <Grid container spacing={2}>
                  {addedMovies.map((movie) => (
                    <Grid item key={movie.id} xs={6} sm={4} md={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                          style={{ objectFit: "cover" }}
                        />
                        <CardContent>
                          <Typography variant="body2">{movie.title}</Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton onClick={() => handleRemoveMovie(movie.id)}>
                            <Close />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSavePlaylist}
              sx={{ mt: 4 }}
            >
              {isEditing ? "Update Playlist" : "Save Playlist"}
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default PlaylistPage;