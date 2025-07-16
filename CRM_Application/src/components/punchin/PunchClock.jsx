import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { toast } from "sonner";
import axios from "axios";
import { AttendanceApi } from "../../services/allapi";

const PunchClock = () => {
  const theme = useTheme();
  const [time, setTime] = useState("00:00:00");
  const [ipAddress, setIpAddress] = useState("Fetching...");
  const [location, setLocation] = useState(null);
  // const [punchedInAt, setPunchedInAt] = useState(null);
  // const [punchedOutAt, setPunchedOutAt] = useState(null);
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

  const punchedInAt = JSON.parse(localStorage.getItem("punchedInAt"))
  const punchedOutAt = JSON.parse(localStorage.getItem("punchedOutAt"))


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
    console.log(ipAddress)
const handlePunchIn = async () => {
  const response = await AttendanceApi({ ipAddress });

  if (response?.status === 200) {
    // setPunchedInAt(response.data?.punchIn || new Date().toISOString());
    localStorage.setItem("punchedInAt",JSON.stringify(response.data?.punchIn || new Date().toISOString()))
    // setPunchedOutAt(null);
    localStorage.setItem("punchedOutAt",null)
    setWorkingTime("");
    toast.success("Punched In Successfully!");
  } else {
    toast.error(response?.response?.data?.message || "Punch In Failed");
  }
};

const handlePunchOut = async () => {
  const response = await AttendanceApi({ ipAddress });

  if (response?.status === 200) {
    const { punchOut, punchIn, workedTime } = response.data;
    // setPunchedOutAt(punchOut);
    localStorage.setItem("punchedOutAt",JSON.stringify(punchOut || null))
    // setPunchedInAt(punchIn);
    localStorage.setItem("punchedInAt",JSON.stringify(punchIn || null))
    setWorkingTime(workedTime);
    toast.success("Punched Out Successfully!");
  } else {
    toast.error("Punch Out Failed");
  }
};


  const handleCheckLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        toast.success("Location fetched!");
      },
      (err) => {
        switch (err.code) {
          case 1:
            toast.error("Permission denied.");
            break;
          case 2:
            toast.error("Location unavailable.");
            break;
          case 3:
            toast.error("Request timed out.");
            break;
          default:
            toast.error("Geolocation error.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: 450,
        minHeight: 350, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "min-height 0.3s ease-in-out",
      }}
    >
      {/* Time and Button */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        p={2}
        borderRadius={2}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#475569" : "#f0f4f8",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {time}
        </Typography>

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

      {/* Location Button */}
      <Button
        onClick={handleCheckLocation}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 25,
          textTransform: "none",
        }}
      >
        📍 Check My Current Location
      </Button>

      {/* Location display */}
      {location && (
        <Typography
          mt={2}
          fontSize="0.85rem"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#64748b" : "#e3f2fd",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 500,
          }}
        >
          <RoomIcon fontSize="small" color="primary" />
          Lat: {location.latitude.toFixed(4)}, Lon:{" "}
          {location.longitude.toFixed(4)}
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Info */}
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
