import { IPersonDetails } from "@/Types/Movies/movies.type";
import { DOBformator } from "@/Utils/CommonFunctions/commonFuncsCient";
import { TMDBConfig } from "@/Utils/config";
import { Box, Grid2, List, ListItem } from "@mui/material";
import Image from "next/image";
import React from "react";

const BasicInfo = ({ personDetails }: { personDetails: IPersonDetails }) => {
  return (
    <Box className='movie-details-info person-details-info'>
      <Grid2 container spacing={8}>
        <Grid2
          size={{ xs: 4, md: 4, lg: 4 }}
          className='movie-details-info-lt person-details-info-lt'
        >
          <Box className='person-details-info-img'>
            <Image
              fill
              src={`${TMDBConfig.images.secure_base_url}/${TMDBConfig.images.profile_sizes[1]}${personDetails.profile_path}`}
              alt=''
            />
          </Box>
        </Grid2>

        <Grid2
          size={{ xs: 8, md: 8, lg: 8 }}
          className='movie-details-info-rt person-details-info-rt'
        >
          <h2>{personDetails.name}</h2>

          <Box className='person-details-list-wrap'>
            <List>
              <p>Known for</p>
              <ListItem className='person-details-list-each'>
                {personDetails.known_for_department}
              </ListItem>
            </List>

            {/* <List>
              <p>Known Credits</p>
              <ListItem className='person-details-list-each'>
                {personDetails.homepage}
              </ListItem>
            </List> */}
            <List>
              <p>Birthday</p>
              <ListItem className='person-details-list-each'>
                {DOBformator(
                  personDetails.birthday,
                  Boolean(personDetails.deathday)
                )}
              </ListItem>
            </List>
            {personDetails.deathday && (
              <List>
                <p>Died on</p>
                <ListItem className='person-details-list-each'>
                  {DOBformator(personDetails.deathday, true)}
                </ListItem>
              </List>
            )}
            <List>
              <p>Gender</p>
              <ListItem className='person-details-list-each'>
                {
                  TMDBConfig.gender.find(
                    (gen) => gen.id === personDetails.gender
                  )?.name
                }
              </ListItem>
            </List>
            <List>
              <p>Birthplace</p>
              <ListItem className='person-details-list-each'>
                {personDetails.place_of_birth}
              </ListItem>
            </List>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BasicInfo;
