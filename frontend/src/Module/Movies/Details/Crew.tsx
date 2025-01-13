import { ICastList } from "@/Types/Movies/movies.type";
import { Box, Button, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Crew = ({ movieCastCrew }: { movieCastCrew: ICastList }) => {
  const router = useRouter();
  const gotoPersonDetails = (id: number) => {
    router.push(`/person/${id}`);
  };
  return (
    <Box
      id='crew_sec'
      className='movie-details-info-tab-content movie-details-tab5'
    >
      <h3>Crew</h3>

      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 12, md: 6, lg: 6 }}
          className='movie-details-tab1-lt'
        >
          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Producers</p>
            <ul className='movie-tag-list'>
              {movieCastCrew.crew
                .filter((item) =>
                  item.job?.toLocaleLowerCase().includes("producer")
                )
                .map((dir) => (
                  <li
                    tabIndex={0}
                    role='button'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                  >
                    {dir.name}
                  </li>
                ))}
            </ul>
          </Box>

          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Writer</p>
            <ul className='movie-tag-list'>
              {movieCastCrew.crew
                .filter((item) =>
                  item.job?.toLocaleLowerCase().includes("writer")
                )
                .map((dir) => (
                  <li
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    tabIndex={0}
                    role='button'
                  >
                    {dir.name}
                  </li>
                ))}
            </ul>
          </Box>

          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Editors</p>
            <ul className='movie-tag-list'>
              {movieCastCrew.crew
                .filter((item) =>
                  item.job?.toLocaleLowerCase().includes("editor")
                )
                .map((dir) => (
                  <li
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    tabIndex={0}
                    role='button'
                  >
                    {dir.name}
                  </li>
                ))}
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
              {movieCastCrew.crew
                .filter((item) =>
                  item.job?.toLocaleLowerCase().includes("cinematography")
                )
                .map((dir) => (
                  <li
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    tabIndex={0}
                    role='button'
                  >
                    {dir.name}
                  </li>
                ))}
            </ul>
          </Box>
          <Box className='movie-details-tab1-card-each'>
            <p className='title'>Story</p>
            <ul className='movie-tag-list'>
              {movieCastCrew.crew
                .filter((item) =>
                  item.job?.toLocaleLowerCase().includes("story")
                )
                .map((dir) => (
                  <li
                    onClick={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    className='movie-tag pointer'
                    onKeyUp={() => {
                      gotoPersonDetails(dir.id);
                    }}
                    tabIndex={0}
                    role='button'
                  >
                    {dir.name}
                  </li>
                ))}
            </ul>
          </Box>
        </Grid2>

        <Button className='p-btn' endIcon={<KeyboardArrowDownIcon />}>
          {" "}
          See all{" "}
        </Button>
      </Grid2>
    </Box>
  );
};

export default Crew;
