"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Iframe from "react-iframe";
import { Swiper as SwiperType } from "swiper/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import StartIcon from "../../../../../../public/images/rating-star.svg";

const Page = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <Container className='movie-details-container'>
      {/* Movie Details Banner */}
      <Box className='movie-details-banner'>
        <Image fill src='/images/movie-details-banner.jpg' alt='' />
      </Box>

      {/* Movie Details Info */}
      <Box className='movie-details-info'>
        <Grid2 container spacing={8}>
          <Grid2
            size={{ xs: 3, md: 3, lg: 3 }}
            className='movie-details-info-lt'
          >
            <Box className='movie-details-info-img'>
              <Image fill src='/images/movie-details-info-image.jpg' alt='' />
            </Box>
          </Grid2>

          <Grid2
            size={{ xs: 9, md: 9, lg: 9 }}
            className='movie-details-info-rt'
          >
            <h2>Alien</h2>
            <ul>
              <li>1979</li>
              <li>155 min</li>
            </ul>
            <p>
              While scavenging the deep ends of a derelict space station, a
              group of young space colonizers come face to face with the most
              terrifying life form in the universe.
            </p>

            <Box className='movie-details-btn-list'>
              <Button
                className='p-btn'
                disabled
                startIcon={<MovieCreationOutlinedIcon />}
              >
                Rent Movie ($0.99)
              </Button>

              <ButtonGroup className='custom-btn-group'>
                <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                  Add to Playlist
                </Button>
                <Button>
                  <KeyboardArrowDownOutlinedIcon />
                </Button>
              </ButtonGroup>

              <IconButton aria-label='favorite' size='large'>
                <FavoriteBorderOutlinedIcon fontSize='inherit' />
              </IconButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Movie Details Info Tab */}
      <Box className='movie-details-info-tab'>
        <List>
          <ListItem className='active-tab'>
            <ListItemText>DETAILS</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>REVIEWS</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>TRAILERS</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>CAST</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>CREW</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>RELEASES</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>PLAYLISTS</ListItemText>
          </ListItem>
        </List>
      </Box>

      {/* Movie Details Details Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab1'>
        <h3>Details</h3>

        <Grid2 container spacing={2}>
          <Grid2
            size={{ xs: 12, md: 6, lg: 6 }}
            className='movie-details-tab1-lt'
          >
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Director</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Ridley Scott</li>
                <li className='movie-tag'>Ridley Scott2</li>
                <li className='movie-tag'>Ridley Scott3</li>
              </ul>
            </Box>

            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Language</p>
              <p>English, Spanish</p>
            </Box>

            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Studio</p>
              <p>20th Century Fox, Brandywine Productions</p>
            </Box>
          </Grid2>

          <Grid2
            size={{ xs: 12, md: 6, lg: 6 }}
            className='movie-details-tab1-rt'
          >
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Genres</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Sci-fi</li>
                <li className='movie-tag'>Horror</li>
                <li className='movie-tag'>Thriller</li>
              </ul>
            </Box>
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Tags</p>
              <p>
                Space Exploration, Alien Lifeform, Survival, Horror, Xenomorph,
                Sci-Fi Horror, Spacecraft, Isolation, Female Protagonist,
                Futuristic Technology
              </p>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Movie Details Review Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab2'>
        <h3>Movier Sharer’s Reviews</h3>
        <Box className='movie-review-score-wrap'>
          <Box className='movie-review-score-lt'>
            <p>Total Score:</p>
            <Box className='total-review'>
              <StarRateIcon />
              <p>
                <span>6 </span> / 10
              </p>
            </Box>
          </Box>
          <Box className='movie-review-score-rt'>
            <List>
              <ListItem>
                Plot
                <span>4/10</span>
              </ListItem>

              <ListItem>
                Story
                <span>4/10</span>
              </ListItem>

              <ListItem>
                Characters
                <span>4/10</span>
              </ListItem>

              <ListItem>
                Cinematography
                <span>4/10</span>
              </ListItem>

              <ListItem>
                Pacing
                <span>4/10</span>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box style={{ textAlign: "center" }}>
          <Button className='p-btn' startIcon={<ReviewsOutlinedIcon />}>
            Write a Review
          </Button>
        </Box>

        <Card className='movie-review-each'>
          <Box className='movie-review-card-lt'>
            <Box className='movie-review-img-holder'>
              <Image fill src='/images/review-img.jpg' alt='' />
            </Box>
          </Box>
          <Box className='movie-review-card-rt'>
            <CardHeader
              avatar={
                <Avatar>
                  <Image fill src='/images/img1.jpg' alt='' />
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Andrea_Rsv'
              subheader='15 March 2024'
            />

            <CardContent>
              <p>
                Alien Romulus <span>7/10</span>{" "}
                <Image width={20} height={20} src={StartIcon} alt='' />
              </p>
              <p>
                <i>“Alien? More like fail-ien...”</i>
              </p>
              <p className='info'>
                if you are going into space i think that you should leave your
                cat at home, he does not need the stress.
              </p>
              <Link href='/login'>
                Read more <ArrowForwardIosIcon />
              </Link>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label='meassage'>
                <ChatBubbleIcon /> 12
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>

        <Card className='movie-review-each'>
          <Box className='movie-review-card-lt'>
            <Box className='movie-review-img-holder'>
              <Image fill src='/images/review-img.jpg' alt='' />
            </Box>
          </Box>
          <Box className='movie-review-card-rt'>
            <CardHeader
              avatar={
                <Avatar>
                  <Image fill src='/images/img1.jpg' alt='' />
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Andrea_Rsv'
              subheader='15 March 2024'
            />

            <CardContent>
              <p>
                Alien Romulus <span>7/10</span>{" "}
                <Image width={20} height={20} src={StartIcon} alt='' />
              </p>
              <p>
                <i>“Alien? More like fail-ien...”</i>
              </p>
              <p className='info'>
                if you are going into space i think that you should leave your
                cat at home, he does not need the stress.
              </p>
              <Link href='/login'>
                Read more <ArrowForwardIosIcon />
              </Link>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label='meassage'>
                <ChatBubbleIcon /> 12
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Card>
      </Box>

      {/* Movie Details Trailers Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab3'>
        <h3>Trailers</h3>

        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          slidesPerView={1}
          className='single-trailer movie-trailer'
        >
          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/xpJdljNdsR0'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>

          <SwiperSlide className='iframe-holder'>
            <Iframe
              url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
              width='100%'
              height='449px'
              frameBorder={0}
              position='relative'
            />
          </SwiperSlide>
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={40}
          slidesPerView={3}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            360: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
          }}
          className='multiple-trailer movie-trailer'
        >
          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='thumb-img-holder'>
              <Image
                fill
                id='thumbnail'
                src='/images/movie-banner.jpg'
                alt='YouTube Video Thumbnail'
              />
              <Box className='trailer-info'>
                <PlayCircleOutlineOutlinedIcon />
                <p>Trailer 1 2:02</p>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>

        {/* <Box className='single-trailer movie-trailer'>
          <Iframe
            url='https://www.youtube.com/embed/xpJdljNdsR0'
            width='100%'
            height='449px'
            frameBorder={0}
            position='relative'
          />
        </Box>

        <Box className='multiple-trailer movie-trailer'>
          <Iframe
            url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
            width='100%'
            height='158px'
            frameBorder={0}
            position='relative'
          />

          <Iframe
            url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
            width='100%'
            height='158px'
            frameBorder={0}
            position='relative'
          />

          <Iframe
            url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
            width='100%'
            height='158px'
            frameBorder={0}
            position='relative'
          />

          <Iframe
            url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
            width='100%'
            height='158px'
            frameBorder={0}
            position='relative'
          />

          <Iframe
            url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
            width='100%'
            height='158px'
            frameBorder={0}
            position='relative'
          />
        </Box> */}
      </Box>

      {/* Movie Details Cast Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab4'>
        <h3>Cast</h3>

        <Swiper
          slidesPerView={7}
          loop
          spaceBetween={6}
          navigation
          modules={[Navigation]}
          breakpoints={{
            360: {
              slidesPerView: 2.5,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1025: {
              slidesPerView: 7,
            },
          }}
          className='castSwiper'
        >
          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <Image fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Movie Details Crew Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab5'>
        <h3>Crew</h3>

        <Grid2 container spacing={2}>
          <Grid2
            size={{ xs: 12, md: 6, lg: 6 }}
            className='movie-details-tab1-lt'
          >
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Producers</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Gordon caroll</li>
                <li className='movie-tag'>Walter Hill</li>
                <li className='movie-tag'>David Giler</li>
                <li className='movie-tag'>Garth Thomas</li>
                <li className='movie-tag'>Ridley Scott</li>
              </ul>
            </Box>

            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Writer</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Ridley Scott</li>
              </ul>
            </Box>

            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Editors</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Ridley Scott</li>
              </ul>
            </Box>
          </Grid2>

          <Grid2
            size={{ xs: 12, md: 6, lg: 6 }}
            className='movie-details-tab1-rt'
          >
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Cinematography</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Ridley Scott</li>
              </ul>
            </Box>
            <Box className='movie-details-tab1-card-each'>
              <p className='title'>Story</p>
              <ul className='movie-tag-list'>
                <li className='movie-tag'>Ridley Scott</li>
              </ul>
            </Box>
          </Grid2>

          <Button className='p-btn' endIcon={<KeyboardArrowDownIcon />}>
            {" "}
            See all{" "}
          </Button>
        </Grid2>
      </Box>

      {/* Movie Details Playlists Tab Content */}
      <Box className='movie-details-info-tab-content movie-details-tab6'>
        <h3>Appears in playlists</h3>
        <Box className='playlist-inner-card'>
          <h3>Horror Classics</h3>

          <List className='playlist-author'>
            <Image width={30} height={30} src='/images/img1.jpg' alt='' />
            <p>Andrea_Rsv</p>
            <p>
              <span>15 March 2024</span>
            </p>
          </List>

          <p>Inspired by grace&apos;s & mar&apos;s profile </p>
          <p>just films that *i think* a lot of girls (including me) love</p>
          <p>includes some filmbro movies but i hope u will understand </p>
          <p>thank you for all the nice comments</p>

          <List className='playlist-img-wrap'>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <ListItem>
              <Image
                width={100}
                height={146}
                src='/images/playlist-img.jpg'
                alt=''
              />
            </ListItem>
            <Box className='more-playlist'>Learn More</Box>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
