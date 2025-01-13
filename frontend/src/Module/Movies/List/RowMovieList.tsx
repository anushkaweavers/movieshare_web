"use client";

import { IMovieInList } from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface IRowMovieList {
  title: string;
  tagList?: { title: string }[];
  movieList: IMovieInList[];
  allowNum?: boolean;
}

const RowMovieList = (props: IRowMovieList) => {
  const router = useRouter();
  const { title, tagList, movieList, allowNum } = props;
  const gotoDetails = (id: number) => {
    router.push(`/movies/${id}`);
  };
  return (
    <Box className='movie-list-wrap movie-list-rating'>
      <Container maxWidth='xl'>
        <Box className='movielist-title'>
          <h3>{title}</h3>
          <ul>
            {tagList?.map((item) => {
              return (
                <li>
                  <Link href='/login' className='active'>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Box>
        {movieList?.length ? (
          <Box className='movie-list-inner'>
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
              className='movie-list-swiper swiperNav'
            >
              {movieList?.map((item, index) => {
                return (
                  <SwiperSlide
                    onClick={() => {
                      gotoDetails(item.id);
                    }}
                  >
                    <Box
                      className={`movie-each each-movie-rating ${allowNum ? "" : "no-movie-rating"}`}
                    >
                      {allowNum && (
                        <Box className='movie-rating'>{index + 1}</Box>
                      )}

                      <Box className='movie-rating-rt'>
                        <Box className='movie-each-img'>
                          <Image
                            fill
                            src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.poster_sizes[3]}${item?.poster_path}`}
                            alt=''
                            placeholder='blur'
                            blurDataURL='/images/movie-default.png'
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
