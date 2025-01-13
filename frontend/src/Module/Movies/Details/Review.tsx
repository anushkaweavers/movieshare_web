import { Box } from "@mui/material";
import React from "react";
// import StarRateIcon from "@mui/icons-material/StarRate";
import NoDataFound from "@/Components/Common/UiComps/NoDataFound";

const Review = () => {
  return (
    <Box
      id='review_sec'
      className='movie-details-info-tab-content movie-details-tab2'
    >
      <h3>Movier Sharer’s Reviews</h3>
      {/* <Box className='movie-review-score-wrap'>
        <Box className='movie-review-lt'>
          <p>Total Score:</p>
          <Box className='total-review'>
            <StarRateIcon />
            <span>6</span>/10
          </Box>
        </Box>
        <Box className='movie-review-rt'>
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
      </Box> */}
      <NoDataFound text='Coming Soon' />
    </Box>
  );
};

export default Review;
