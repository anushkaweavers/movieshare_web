import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface IFullScreenLoader {
  open: boolean;
}

const FullScreenLoader = (props: IFullScreenLoader) => {
  const { open } = props;
  return open ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background
        zIndex: 9999, // Ensure loader stays on top
      }}
    >
      <CircularProgress size={80} color='secondary' />
    </Box>
  ) : null;
};

export default FullScreenLoader;
