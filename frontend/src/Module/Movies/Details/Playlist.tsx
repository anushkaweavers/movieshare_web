import NoDataFound from "@/Components/Common/UiComps/NoDataFound";
import { Box } from "@mui/material";
import React from "react";

const Playlist = () => {
  return (
    <Box
      id='playlist_sec'
      className='movie-details-info-tab-content movie-details-tab6'
    >
      <h3>Appears in playlists</h3>
      {/* <Box className='playlist-inner-card'>
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
      </Box> */}
      <NoDataFound text='Coming Soon' />
    </Box>
  );
};

export default Playlist;
