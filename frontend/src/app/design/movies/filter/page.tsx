"use client";

import {
  Box,
  Container,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const page = () => {
  return (
    <div>
      {/* <Box className='header-wrap'>
        <Container maxWidth={false}>
          <Grid2 container spacing={2} className='large-container'>
            <Grid2 size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
              <Image
                width={196}
                height={44}
                src='/images/dark-logo.svg'
                alt=''
              />
            </Grid2>

            <Grid2 size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
              <ul className='page-tab'>
                <li>
                  <Button className='p-btn'>
                    <Image
                      width={20}
                      height={14}
                      src='/images/community-icon.svg'
                      alt=''
                    />
                    <span>Community</span>
                  </Button>
                </li>
                <li>
                  <Button className='p-btn active'>
                    <Image
                      width={20}
                      height={20}
                      src='/images/movies-icon.svg'
                      alt=''
                    />
                    <span>Movies</span>
                  </Button>
                </li>
              </ul>
            </Grid2>

            <Grid2
              size={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              className='header-rt'
            >
              <ul>
                <li className='header-search'>
                  <Link href='/design/auth/login'>
                    <Image
                      width={20}
                      height={14}
                      src='/images/search-icon.svg'
                      alt=''
                    />
                  </Link>{" "}
                </li>
                <li className='header-create'>
                  <Link href='/design/auth/login'>
                    <Image
                      width={14}
                      height={15}
                      src='/images/plus-icon.svg'
                      alt=''
                    />
                  </Link>
                  <span>Create</span>
                </li>
                <li className='header-notification'>
                  <Link href='/design/auth/login'>
                    <Image
                      width={20}
                      height={14}
                      src='/images/bell-icon.svg'
                      alt=''
                    />
                  </Link>
                  <span className='noti-dot' />
                </li>
                <li className='header-message'>
                  <Link href='/design/auth/login'>
                    <Image
                      width={20}
                      height={14}
                      src='/images/message-icon.svg'
                      alt=''
                    />
                  </Link>
                  <span className='noti-dot' />
                </li>
                <li className='user-perfile'>
                  <Link href='/design/auth/login'>
                    <Image fill src='/images/profile-img.jpg' alt='' />
                  </Link>
                </li>
              </ul>
            </Grid2>
          </Grid2>
        </Container>
      </Box> */}

      <Box className='movie-filter-wraper'>
        <Container maxWidth='xl' className='movie-filter-list'>
          <Grid2 container spacing={2}>
            <Grid2
              size={{ lg: 9, md: 8, sm: 12, xs: 12 }}
              className='filter-browse-by'
            >
              <FormGroup className='input-each'>
                <InputLabel className='input-label'>Browse by:</InputLabel>
                <Select
                  className='input-select'
                  value={10}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={10}>Popularity</MenuItem>
                  <MenuItem value={11}>Popularity1</MenuItem>
                  <MenuItem value={12}>Popularity2</MenuItem>
                </Select>

                <Select
                  className='input-select'
                  value={11}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={11}>Popularity</MenuItem>
                  <MenuItem value={12}>Popularity1</MenuItem>
                  <MenuItem value={13}>Popularity2</MenuItem>
                </Select>

                <Select
                  className='input-select'
                  value={10}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={10}>Popularity</MenuItem>
                  <MenuItem value={11}>Popularity1</MenuItem>
                  <MenuItem value={12}>Popularity2</MenuItem>
                </Select>

                <Select
                  className='input-select'
                  value={11}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={11}>Popularity</MenuItem>
                  <MenuItem value={12}>Popularity1</MenuItem>
                  <MenuItem value={13}>Popularity2</MenuItem>
                </Select>

                <Select
                  className='input-select'
                  value={11}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={11}>Popularity</MenuItem>
                  <MenuItem value={12}>Popularity1</MenuItem>
                  <MenuItem value={13}>Popularity2</MenuItem>
                </Select>
              </FormGroup>
            </Grid2>

            <Grid2
              size={{ lg: 3, md: 4, sm: 12, xs: 12 }}
              className='filter-sort'
            >
              <FormGroup className='input-each'>
                <InputLabel className='input-label'>Sort by:</InputLabel>

                <Select
                  className='input-select'
                  value={10}
                  IconComponent={KeyboardArrowDownIcon}
                >
                  <MenuItem value={10}>Popularity</MenuItem>
                  <MenuItem value={11}>Popularity1</MenuItem>
                  <MenuItem value={12}>Popularity2</MenuItem>
                </Select>
                <Image
                  width={17}
                  height={18}
                  src='/images/sort-icon.svg'
                  alt=''
                />
              </FormGroup>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      <Box className='movie-list-wrap'>
        <Container maxWidth='xl'>
          <Box className='row movie-list-inner movie-list-filter'>
            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>

            <Box className='movie-each'>
              <Box className='movie-each-img'>
                <Image fill src='/images/movie-img.jpg' alt='' />
              </Box>
              <p>Jackie Brown</p>
              <p>1997</p>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default page;
