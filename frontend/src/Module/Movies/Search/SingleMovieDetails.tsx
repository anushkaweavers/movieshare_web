import {
  ICastMovie,
  ICrewMovie,
  IMovieInList,
} from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ISingleMovie {
  index: number;
  item: IMovieInList | ICastMovie | ICrewMovie;
}

const SingleMovieDetails = ({ index, item }: ISingleMovie) => {
  const router = useRouter();
  const [img, setImg] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${item?.poster_path}`
  );
  const gotoDetails = (id: number) => {
    router.push(`/movies/${id}`);
  };
  useEffect(() => {
    setImg(
      `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${item?.poster_path}`
    );
  }, [item]);
  return (
    <Box className='movie-each pointer' key={index}>
      <div
        role='button'
        tabIndex={0}
        onKeyUp={() => {
          gotoDetails(item.id);
        }}
        onClick={() => {
          gotoDetails(item.id);
        }}
      >
        <Box className='movie-each-img'>
          <Image
            fill
            src={`${img}`}
            objectFit='cover'
            alt='poster'
            placeholder='blur'
            blurDataURL='/images/movie-default.png'
            onError={() => setImg(`/images/movie-default.png`)}
          />
        </Box>
        <p>{item?.title}</p>
        <p>{new Date(item?.release_date).getFullYear()}</p>
      </div>
    </Box>
  );
};

export default SingleMovieDetails;
