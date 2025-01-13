import NoDataFound from "@/Components/Common/UiComps/NoDataFound";
import { IMovieInList } from "@/Types/Movies/movies.type";
import { Box, Container } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleMovieDetails from "./SingleMovieDetails";

interface IMovieSearch {
  movieList: IMovieInList[];
  callNextPage: () => void;
}

const MovieList = (props: IMovieSearch) => {
  const { movieList, callNextPage } = props;
  return (
    <Box className='movie-list-wrap'>
      <Container maxWidth='xl'>
        <Box className=''>
          {movieList?.length ? (
            <InfiniteScroll
              className='movie-list-inner movie-list-filter'
              dataLength={movieList.length} // This is important field to render the next data
              next={() => {
                callNextPage();
              }}
              hasMore={!(movieList.length % 20)}
              loader={<>.</>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  {/* <b>Yay! You have seen it all</b> */}
                </p>
              }
            >
              {movieList?.map((item, index) => {
                return <SingleMovieDetails index={index} item={item} />;
              })}
            </InfiniteScroll>
          ) : (
            <NoDataFound text='No Search Results Found' />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MovieList;
