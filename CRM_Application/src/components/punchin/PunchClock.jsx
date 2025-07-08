import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import RoomIcon from "@mui/icons-material/Room";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toast } from "sonner";
import axios from "axios";
import { AttendanceApi } from "../../services/allapi";

const PunchClock = () => {
  const [time, setTime] = useState("00:00:00");
  const [ipAddress, setIpAddress] = useState("Fetching...");
  const [location, setLocation] = useState(null);
  const [punched, setPunched] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("Unavailable"));
  }, []);

  const handlePunch = async () => {
    if (!location) return toast.error("Please fetch location first.");

    const [lat, lon] = location
      .replace("Lat: ", "")
      .replace("Lon: ", "")
      .split(", ")
      .map((val) => parseFloat(val));

    const reqBody = {
      location: { latitude: lat, longitude: lon },
      ipAddress,
    };

    const response = await AttendanceApi(reqBody);
    if (response?.status === 200) {
      setPunched(true);
      toast.success("Punched In Successfully!");
    } else {
      toast.error(response?.response?.data?.message || "Punch Failed");
    }
  };

  const handleCheckLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = `Lat: ${position.coords.latitude.toFixed(
          4
        )}, Lon: ${position.coords.longitude.toFixed(4)}`;
        setLocation(loc);
        toast.success("Location fetched!");
      },
      () => toast.error("Location access denied.")
    );
  };

  return (
    <Card sx={{ width: 400, mx: "auto", mt: 6, borderRadius: 3, px: 3, pt: 2, pb: 4 }}>
      <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
        <SettingsIcon />
      </IconButton>
      <Typography fontWeight={600} variant="h6" mb={1}>Punch Clock</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>Click below to punch in.</Typography>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon color="action" />
          <Typography fontWeight={700} fontSize="1.4rem">{time}</Typography>
        </Box>
        <Button
          variant="contained"
          disabled={punched}
          startIcon={<PlayArrowIcon />}
          onClick={handlePunch}
          sx={{ borderRadius: 25, fontWeight: 600, backgroundColor: punched ? "#ccc" : "#4caf50" }}
        >
          Punch In
        </Button>
      </Box>
      <Button onClick={handleCheckLocation} variant="outlined" fullWidth sx={{ borderRadius: 25 }}>Check My Current Location</Button>
      {location && (
        <Typography mt={2} fontSize="0.8rem" sx={{ border: "1px solid #5BC0DE", p: 1 }}>
          <RoomIcon fontSize="small" /> {location}
        </Typography>
      )}
    </Card>
  );
};

export default PunchClock;