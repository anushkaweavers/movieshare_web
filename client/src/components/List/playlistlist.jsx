import React, { useEffect, useState } from "react";
import axiosCustom from "../../Services/AxiosConfig/axiosCustom";
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material"; // Removed Edit icon
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./playlistList.css";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axiosCustom.get(`/playlist?page=${page}&limit=10`);
      if (response.data.length > 0) {
        setPlaylists((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (playlistId) => {
    try {
      await axiosCustom.delete(`/playlist/${playlistId}`);
      setPlaylists((prev) => prev.filter((playlist) => playlist._id !== playlistId));
      alert("Playlist deleted successfully!");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      alert("Failed to delete playlist. Please try again.");
    }
  };

  const handleCardClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`); // Navigate to playlist details page
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      fetchPlaylists();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="playlist-list">
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Your Playlists
        </Typography>
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid item key={playlist._id} xs={12} sm={6} md={4}>
              <Card onClick={() => handleCardClick(playlist._id)} style={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={playlist.thumbnail}
                  alt={playlist.playlistTitle}
                />
                <CardContent>
                  <Typography variant="h6">{playlist.playlistTitle}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {playlist.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleDelete(playlist._id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {loading && <CircularProgress style={{ display: "block", margin: "20px auto" }} />}
        {!hasMore && <Typography variant="body1" align="center">No more playlists to load.</Typography>}
      </Container>
    </div>
  );
};

export default PlaylistList;