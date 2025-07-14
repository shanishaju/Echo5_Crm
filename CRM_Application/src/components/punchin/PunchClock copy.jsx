import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Divider,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("Unavailable"));
  }, []);

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
      setPunchedInAt(response.data?.punchIn || new Date().toISOString());
      setPunchedOutAt(null);
      setWorkingTime("");
      toast.success("Punched In Successfully!");
    } else {
      const errMsg = response?.response?.data?.message || "Punch In Failed";
      toast.error(errMsg);
    }
  };

  const handlePunchOut = async () => {
    const reqBody = {
      location: null,
      ipAddress,
    };

    const response = await AttendanceApi(reqBody);

    if (response?.status === 200) {
      const { punchOut, punchIn, workedTime } = response.data;
      setPunchedOutAt(punchOut);
      setPunchedInAt(punchIn);
      setWorkingTime(workedTime);
      toast.success("Punched Out Successfully!");
    } else {
      toast.error("Punch Out Failed");
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
<Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: 450, 
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <IconButton sx={{ position: "absolute", top: 16, right: 16 }}>
        <SettingsIcon color="action" />
      </IconButton>
      {/* 
      <Typography variant="h5" fontWeight="bold" mb={1}>
        ⏱️ Punch Clock
      </Typography> */}

      {/* Live Clock */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        p={2}
        borderRadius={3}
        sx={{ backgroundColor: "#f7f9fc" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {/* <AccessTimeIcon color="primary" /> */}
          <Typography variant="h6" fontWeight={600}>
            {time}
          </Typography>
        </Box>

        {punchedInAt && !punchedOutAt ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<StopIcon />}
            onClick={handlePunchOut}
            sx={{ borderRadius: 25, ml: 4 }}
          >
            Punch Out
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handlePunchIn}
            disabled={punchedInAt !== null && punchedOutAt === null}
            sx={{
              borderRadius: 25,
              background: "linear-gradient(to right, #00c853, #64dd17)",
              color: "#fff",
              ml: 4,
            }}
          >
            Punch In
          </Button>
        )}
      </Box>

      {/* Location Section */}
      <Button
        onClick={handleCheckLocation}
        variant="outlined"
        fullWidth
        sx={{ borderRadius: 25, textTransform: "none" }}
      >
        📍 Check My Current Location
      </Button>

      {location && (
        <Typography
          mt={2}
          fontSize="0.85rem"
          sx={{
            backgroundColor: "#e3f2fd",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 500,
          }}
        >
          <RoomIcon fontSize="small" color="primary" /> {location}
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Punch Info */}
      {punchedInAt && (
        <Typography fontSize="0.9rem" gutterBottom>
          🕒 <strong>Punched In:</strong> {formatToIST(punchedInAt)}
        </Typography>
      )}
      {punchedOutAt && (
        <Typography fontSize="0.9rem" gutterBottom>
          🕔 <strong>Punched Out:</strong> {formatToIST(punchedOutAt)}
        </Typography>
      )}
      {workingTime && (
        <Typography
          mt={1}
          fontSize="1rem"
          fontWeight="bold"
          color="success.main"
        >
          ⏱️ Worked: {workingTime}
        </Typography>
      )}
    </Paper>
  );
};

export default PunchClock;
