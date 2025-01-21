import { TMDBConfig } from "../../Utils/config";
import { Box, Container } from "@mui/material";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useNavigate } from "react-router-dom"; // Using React Router for navigation

const RowMovieList = ({ title, tagList, movieList, allowNum }) => {
  const navigate = useNavigate();

  const gotoDetails = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <Box className="movie-list-wrap movie-list-rating">
      <Container maxWidth="xl">
        <Box className="movielist-title">
          <h3>{title}</h3>
          <ul>
            {tagList?.map((item, index) => {
              return (
                <li key={index}>
                  <a href="/login" className="active">
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </Box>
        {movieList?.length ? (
          <Box className="movie-list-inner">
            <Swiper
              spaceBetween={32}
              slidesPerView={5}
              navigation
              modules={[Navigation]}
              breakpoints={{
                360: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                1025: {
                  slidesPerView: 5,
                },
              }}
              className="movie-list-swiper swiperNav"
            >
              {movieList?.map((item, index) => {
                return (
                  <SwiperSlide
                    key={item.id}
                    onClick={() => {
                      gotoDetails(item.id);
                    }}
                  >
                    <Box
                      className={`movie-each each-movie-rating ${
                        allowNum ? "" : "no-movie-rating"
                      }`}
                    >
                      {allowNum && (
                        <Box className="movie-rating">{index + 1}</Box>
                      )}

                      <Box className="movie-rating-rt">
                        <Box className="movie-each-img">
                          <img
                            src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.poster_sizes[3]}${item?.poster_path}`}
                            alt={item?.title || "Movie Poster"}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            placeholder="blur"
                            data-src="/images/movie-default.png" // fallback image
                          />
                        </Box>
                        <p>{item.title}</p>
                        <p>{new Date(item?.release_date).getFullYear()}</p>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default RowMovieList;
