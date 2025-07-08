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
import StopIcon from "@mui/icons-material/Stop";
import { toast } from "sonner";
import axios from "axios";
import { AttendanceApi } from "../../services/allapi";

const PunchClock = () => {
  const [time, setTime] = useState("00:00:00");
  const [ipAddress, setIpAddress] = useState("Fetching...");
  const [location, setLocation] = useState(null);
  const [punchedInAt, setPunchedInAt] = useState(null);
  const [punchedOutAt, setPunchedOutAt] = useState(null);
  const [workingTime, setWorkingTime] = useState("");

  // Format UTC time to IST
  const formatToIST = (utcTime) => {
    return new Date(utcTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get public IP
  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("Unavailable"));
  }, []);

  // Punch In
  const handlePunchIn = async () => {
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
      setPunchedInAt(new Date().toISOString());
      toast.success("Punched In Successfully!");
    } else {
      toast.error(response?.response?.data?.message || "Punch In Failed");
    }
  };

  // Punch Out
  const handlePunchOut = () => {
    const punchOutTime = new Date().toISOString();
    setPunchedOutAt(punchOutTime);

    const inTime = new Date(punchedInAt);
    const outTime = new Date(punchOutTime);
    const diffMs = outTime - inTime;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setWorkingTime(`${hours}h ${minutes}m ${seconds}s`);
    toast.success("Punched Out Successfully!");
  };

  // Get location
  const handleCheckLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
        setLocation(loc);
        toast.success("Location fetched!");
      },
      () => toast.error("Location access denied.")
    );
  };

  return (
    <Card sx={{ width: 400, mx: "auto", mt: 6, borderRadius: 3, px: 3, pt: 2, pb: 4, boxShadow: 3 }}>
      <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
        <SettingsIcon />
      </IconButton>

      <Typography fontWeight={600} variant="h6" mb={1}>Punch Clock</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>Click below to punch in/out.</Typography>

      {/* Clock */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon color="action" />
          <Typography fontWeight={700} fontSize="1.4rem">{time}</Typography>
        </Box>

        {punchedInAt && !punchedOutAt ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<StopIcon />}
            onClick={handlePunchOut}
            sx={{ borderRadius: 25 }}
          >
            Punch Out
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handlePunchIn}
            disabled={punchedInAt !== null && punchedOutAt === null}
            sx={{ borderRadius: 25, backgroundColor: "#4caf50" }}
          >
            Punch In
          </Button>
        )}
      </Box>

      {/* Location */}
      <Button
        onClick={handleCheckLocation}
        variant="outlined"
        fullWidth
        sx={{ borderRadius: 25 }}
      >
        Check My Current Location
      </Button>

      {location && (
        <Typography mt={2} fontSize="0.8rem" sx={{ border: "1px solid #5BC0DE", p: 1, borderRadius: 2 }}>
          <RoomIcon fontSize="small" /> {location}
        </Typography>
      )}

      {/* Display Time Logs */}
      {punchedInAt && (
        <Typography mt={2} fontSize="0.9rem">🕒 Punched In At: {formatToIST(punchedInAt)}</Typography>
      )}
      {punchedOutAt && (
        <Typography mt={1} fontSize="0.9rem">🕔 Punched Out At: {formatToIST(punchedOutAt)}</Typography>
      )}
      {workingTime && (
        <Typography mt={1} fontSize="1rem" fontWeight="bold" color="green">
          ⏱️ Total Working Time: {workingTime}
        </Typography>
      )}
    </Card>
  );
};

export default PunchClock;
