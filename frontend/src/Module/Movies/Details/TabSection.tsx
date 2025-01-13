import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";

const TabSection = () => {
  const [selectedSection, setSelectedSection] = useState("details_sec");

  const scrollIntoSpecificSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };
  const getDivsUnderHalfScreenWithIds = () => {
    const windowHeight = window.innerHeight;
    const divs = document.querySelectorAll("div[id]"); // Select all divs with IDs
    const divsUnderHalfScreen: string[] = [];

    divs.forEach((div) => {
      const rect = div.getBoundingClientRect();
      const divBottom = rect.bottom;

      if (divBottom > windowHeight / 1.5) {
        divsUnderHalfScreen.push(div.id);
      }
    });
    setSelectedSection(divsUnderHalfScreen[0]);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => getDivsUnderHalfScreenWithIds());

    return () => {
      // return a cleanup function to unregister our function since it will run multiple times
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <Box className='movie-details-info-tab'>
      <List>
        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("details_sec");
          }}
          className={selectedSection === "details_sec" ? "active-tab" : ""}
        >
          <ListItemText>DETAILS</ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("review_sec");
          }}
          className={selectedSection === "review_sec" ? "active-tab" : ""}
        >
          <ListItemText>REVIEWS</ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("trailer_sec");
          }}
          className={selectedSection === "trailer_sec" ? "active-tab" : ""}
        >
          <ListItemText>TRAILERS</ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("cast_sec");
          }}
          className={selectedSection === "cast_sec" ? "active-tab" : ""}
        >
          <ListItemText>CAST</ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("crew_sec");
          }}
          className={selectedSection === "crew_sec" ? "active-tab" : ""}
        >
          <ListItemText>CREW</ListItemText>
        </ListItem>

        <ListItem
          onClick={() => {
            scrollIntoSpecificSection("playlist_sec");
          }}
          className={selectedSection === "playlist_sec" ? "active-tab" : ""}
        >
          <ListItemText>PLAYLISTS</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default TabSection;
