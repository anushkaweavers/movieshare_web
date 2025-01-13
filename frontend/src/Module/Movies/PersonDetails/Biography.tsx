import { IPersonDetails } from "@/Types/Movies/movies.type";
import { Box } from "@mui/material";
import React from "react";

const Biography = ({ personDetails }: { personDetails: IPersonDetails }) => {
  return (
    <Box className='movie-details-info-tab-content person-details-info-tab-content'>
      <h3>Biography</h3>
      <p>{personDetails.biography}</p>
    </Box>
  );
};

export default Biography;
