import React from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "react-router-dom/Link";
import { TMDBConfig } from "@/Utils/config";

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
            {tagList?.map((item, index) => (
              <li key={index}>
                <Link to="/login" className="active">
                  {item.title}
                </Link>
              </li>
            ))}
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
              {movieList?.map((item, index) => (
                <SwiperSlide
                  key={item.id}
                  onClick={() => gotoDetails(item.id)}
                >
                  <Box
                    className={`movie-each each-movie-rating ${allowNum ? "" : "no-movie-rating"}`}
                  >
                    {allowNum && (
                      <Box className="movie-rating">{index + 1}</Box>
                    )}

                    <Box className="movie-rating-rt">
                      <Box className="movie-each-img">
                        <img
                          src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.poster_sizes[3]}${item?.poster_path}`}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <p>{item.title}</p>
                      <p>{new Date(item?.release_date).getFullYear()}</p>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default RowMovieList;
