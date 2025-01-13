import { ICast } from "@/Types/Movies/movies.type";
import { TMDBConfig } from "@/Utils/config";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const SingleCast = ({ cast }: { cast: ICast }) => {
  const [img, setImg] = useState(
    `${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[2]}${cast.profile_path}`
  );
  return (
    <Box className='cast-each pointer'>
      <Box className='cast-img-holder'>
        <Image
          fill
          objectFit='cover'
          src={`${img}`}
          alt='people-icon'
          placeholder='blur'
          blurDataURL='/images/people-default.jpg'
          onError={() => setImg(`/images/people-default.jpg`)}
        />
      </Box>
      <p>{cast.character}</p>
      <p>{cast.name}</p>
    </Box>
  );
};

export default SingleCast;
