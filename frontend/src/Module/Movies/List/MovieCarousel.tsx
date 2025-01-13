"use client";

import ButtonField from "@/Components/Common/UiComps/ButtonField";
import { IMovieList } from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface ICarouselType {
  movieList: IMovieList;
}

const MovieCarousel = (props: ICarouselType) => {
  const router = useRouter();
  const { movieList } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const gotoDetails = (id: number) => {
    router.push(`/movies/${id}`);
  };
  return (
    <Box className='movie-banner'>
      <Swiper
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className='movieBannerSwiper'
      >
        {movieList?.results.map((item) => {
          return (
            <SwiperSlide>
              <Box className='movie-banner-inner'>
                <Box className='movie-banner-img-holder'>
                  <Image
                    fill
                    src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.backdrop_sizes[2]}${item?.backdrop_path}`}
                    alt=''
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL='/images/movie-default.png'
                  />
                </Box>
                <Box className='movie-banner-info'>
                  <Container maxWidth='xl'>
                    <Box className='movie-banner-info-inner'>
                      <Box className='movie-tag-list'>
                        {item.genre_ids?.map((genre) => {
                          return (
                            <Box className='movie-tag'>
                              <span>
                                {
                                  TMDBConfig.genres.find((sGenre) => {
                                    return sGenre.id === genre;
                                  })?.name
                                }
                              </span>
                            </Box>
                          );
                        })}
                      </Box>
                      <h2>{item?.title}</h2>
                      <p>{item?.overview}</p>
                      <Box className='d-flex movie-bnr-btn'>
                        <ButtonField
                          label='Movie Details'
                          img='/images/right-arrow.svg'
                          imgHeight={17}
                          imgWidth={15}
                          alt='Details'
                          mainCls='p-btn'
                          onClick={() => {
                            gotoDetails(item.id);
                          }}
                        />

                        <Box className='add-to-playlist-btn'>
                          {/* <Button
                            className='add-to-playlist p-btn border-btn'
                            id='basic-button1'
                            aria-controls={
                              openDropdown ? "basic-menu1" : undefined
                            }
                            aria-haspopup='true'
                            aria-expanded={openDropdown ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <Image
                              width={12}
                              height={17}
                              src='/images/tag-icon.svg'
                              alt=''
                            />
                            <span>Add to Playlist</span>
                            <Image
                              width={13}
                              height={8}
                              src='/images/down-arrow.svg'
                              alt=''
                            />
                          </Button> */}
                          <ButtonGroup className='custom-btn-group'>
                            <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                              Add to Playlist
                            </Button>
                            <Button>
                              <KeyboardArrowDownOutlinedIcon />
                            </Button>
                          </ButtonGroup>

                          <Menu
                            className='playlist-dropdown'
                            id='basic-menu1'
                            anchorEl={anchorEl}
                            open={openDropdown}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button1",
                            }}
                          >
                            <MenuItem onClick={handleClose}>Watchlist</MenuItem>
                            <MenuItem onClick={handleClose}>
                              Fav Horror movies
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Cusser movies
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Create new list
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default MovieCarousel;
