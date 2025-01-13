"use client";

import { Box, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "next/navigation";
import MovieList from "./MovieList";
import { useSearched } from "./useSearched";

const MovieSearchIndex = () => {
  const searchParams = useSearchParams();
  const { callNextPage, handleSearch, movieData } = useSearched();

  useEffect(() => {
    if (searchParams.get("s")) {
      handleSearch(searchParams.get("s")!);
      const elem = document.getElementById(
        "search-bar-movie"
      ) as HTMLInputElement;
      elem!.value = `${searchParams.get("s")}`;
    }
  }, []);
  return (
    <>
      <Box className='movie-search-wrap'>
        <Container maxWidth='xl'>
          <Box className='search-input'>
            <form>
              <TextField
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                id='search-bar-movie'
                className='text'
                variant='outlined'
                placeholder='Search'
                fullWidth
              />
              <IconButton
                type='submit'
                aria-label='search'
                className='search-btn'
              >
                <SearchIcon style={{ fill: "#9B9B9B" }} />
              </IconButton>
            </form>
          </Box>
        </Container>
      </Box>
      <MovieList movieList={movieData.results} callNextPage={callNextPage} />
    </>
  );
};

export default MovieSearchIndex;
