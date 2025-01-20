import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
} from "@mui/material";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Iframe from "react-iframe";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import "../../custom.css";
import "../../responsive.css";
import "../../dark.css";
import "../../developer.css";
import "../../global.css";

const Page = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [activeTab, setActiveTab] = useState("details");

  // Scroll observer to track active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // 70% of the section should be visible
    };

    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Example of setting active tab or section
          console.log(entry.target.id); 
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, options);
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Container className="movie-details-container">
      <>
        {/* Movie Details Banner */}
        <Box className="movie-details-banner" sx={{ marginBottom: 0.2, padding: 0, maxHeight: "440px", overflow: "hidden" }}>
          <img
            src="/images/movie-details-banner.jpg"
            alt="Movie Banner"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: 15,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Movie Details Info */}
        <Box className="movie-details-info" sx={{ marginBottom: 1.5 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} lg={3}>
              <Box className="movie-details-info-img" sx={{ borderRadius: 3, overflow: "hidden" }}>
                <img
                  src="/images/movie-details-info-image.jpg"
                  alt="Movie Thumbnail"
                  style={{
                    width: "50%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8} lg={9} className="movie-details-info-rt">
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

              <Box className="movie-details-btn-list">
                <Button
                  className="p-btn"
                  disabled
                  startIcon={<MovieCreationOutlinedIcon />}
                >
                  Rent Movie ($0.99)
                </Button>

                <ButtonGroup className="custom-btn-group">
                  <Button startIcon={<BookmarkBorderOutlinedIcon />}>
                    Add to Playlist
                  </Button>
                  <Button>
                    <KeyboardArrowDownOutlinedIcon />
                  </Button>
                </ButtonGroup>

                <IconButton aria-label="favorite" size="large">
                  <FavoriteBorderOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Movie Details Info Tab */}
        <Box className="movie-details-info-tab" sx={{ marginBottom: 1.5 }}>
          <List>
            {["details", "reviews", "trailers", "cast", "crew", "releases", "playlists"].map((tab) => (
              <ListItem
                button
                key={tab}
                className={activeTab === tab ? "active-tab" : ""}
                onClick={() => setActiveTab(tab)}
              >
                <ListItemText>{tab.toUpperCase()}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Movie Details Tab Content */}
        <Box
          className="movie-details-info-tab-content movie-details-tab1 scroll-section"
          id="details"
          sx={{ marginBottom: 1.5 }}
        >
          <h3>Details</h3>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box className="movie-details-tab1-card-each" sx={{ marginBottom: 2 }}>
                <p className="title">Director</p>
                <ul className="movie-tag-list">
                  <li className="movie-tag">Ridley Scott</li>
                  <li className="movie-tag">Ridley Scott2</li>
                  <li className="movie-tag">Ridley Scott3</li>
                </ul>
              </Box>

              <Box className="movie-details-tab1-card-each" sx={{ marginBottom: 2 }}>
                <p className="title">Language</p>
                <p>English, Spanish</p>
              </Box>

              <Box className="movie-details-tab1-card-each" sx={{ marginBottom: 2 }}>
                <p className="title">Studio</p>
                <p>20th Century Fox, Brandywine Productions</p>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="movie-details-tab1-card-each" sx={{ marginBottom: 2 }}>
                <p className="title">Genres</p>
                <ul className="movie-tag-list">
                  <li className="movie-tag">Sci-fi</li>
                  <li className="movie-tag">Horror</li>
                  <li className="movie-tag">Thriller</li>
                </ul>
              </Box>
              <Box className="movie-details-tab1-card-each" sx={{ marginBottom: 2 }}>
                <p className="title">Tags</p>
                <p>
                  Space Exploration, Alien Lifeform, Survival, Horror, Xenomorph, Sci-Fi Horror, Spacecraft, Isolation, Female Protagonist, Futuristic Technology
                </p>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Reviews Section */}
        <Box
          className="movie-details-info-tab-content movie-details-tab2 scroll-section"
          id="reviews"
          sx={{ marginBottom: 1.5 }}
        >
          <h3>Movier Sharer’s Reviews</h3>

          <Box className="movie-review-score-wrap">
            <Box className="movie-review-score-lt">
              <p>Total Score:</p>
              <Box className="total-review">
                <StarRateIcon />
                <p>
                  <span>6 </span> / 10
                </p>
              </Box>
            </Box>
            <Box className="movie-review-score-rt">
              <List>
                <ListItem>
                  Plot<span>4/10</span>
                </ListItem>
                <ListItem>
                  Story<span>4/10</span>
                </ListItem>
                <ListItem>
                  Characters<span>4/10</span>
                </ListItem>
                <ListItem>
                  Cinematography<span>4/10</span>
                </ListItem>
                <ListItem>
                  Pacing<span>4/10</span>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Button className="p-btn" startIcon={<ReviewsOutlinedIcon />}>
              Write a Review
            </Button>
          </Box>
        </Box>

        {/* Reviews List */}
        <Box className="movie-reviews-list">
          {[1, 2].map((index) => (
            <Card key={index} className="movie-review-each">
              <Box className="movie-review-card-lt">
                <Box className="movie-review-img-holder">
                  <img src="/images/review-img.jpg" alt="" />
                </Box>
              </Box>
              <Box className="movie-review-card-rt">
                <CardHeader
                  avatar={
                    <Avatar>
                      <img src="/images/img1.jpg" alt="" />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Andrea_Rsv"
                  subheader="15 March 2024"
                />
                <CardContent>
                  <p>
                    Alien Romulus <span>7/10</span>{" "}
                    <img width={20} height={20} src="/images/rating-star.svg" alt="" />
                  </p>
                  <p>
                    <i>“Alien? More like fail-ien…”</i>
                  </p>
                  <p className="info">
                    if you are going into space i think that you should leave your
                    cat at home, he does not need the stress.
                  </p>
                  <a href="/login">
                    Read more <ArrowForwardIosIcon />
                  </a>
                </CardContent>

                <CardActions disableSpacing>
                  <IconButton aria-label="message">
                    <ChatBubbleIcon /> 12
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Box>
            </Card>
          ))}
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
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>

            <SwiperSlide className='iframe-holder'>
              <Iframe
                url='https://www.youtube.com/embed/LEjhY15eCx0?si=DNK7ETuQAJXGxbaf'
                width='100%'
                height='500px'
                frameBorder={0}
                position='relative'
              />
            </SwiperSlide>
          </Swiper>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={40}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs, Navigation]}
            className='movie-trailer-thumbs'
          >
            <SwiperSlide>
              <Box className="iframe-thumb-holder">
                <img
                  src="https://via.placeholder.com/200x100"
                  alt="thumb"
                  className="iframe-thumb"
                />
              </Box>
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
              <img
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
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
              </Box>
              <p>Sigourney Weaver</p>
              <p>Ellen Ripley</p>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className='cast-each'>
              <Box className='cast-img-holder'>
                <img fill src='/images/cast-img1.jpg' alt='' />
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
        </>
       
    </Container>
  );
};

export default Page;
