import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ImageSliderCard = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        height: 300,
        backgroundColor: "#000",
      }}
    >
      <Box
        component="img"
        src="/assets/img/carousel-3.jpg"
        alt="carousel"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          p: 2,
          color: "white",
          width: "80%",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "white",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <i className="ni ni-trophy text-slate-700" />
        </Box>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Share with us your design tips!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Don’t be afraid to be wrong because you can’t learn anything from a compliment.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ImageSliderCard;
