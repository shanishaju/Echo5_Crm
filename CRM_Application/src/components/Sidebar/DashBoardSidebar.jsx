import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AppsIcon from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const menuItems = [
  { icon: <DashboardIcon sx={{ color: "#3b82f6" }} />, label: "Home", link: "/pages/dashboard.html" },
  { icon: <GroupAddIcon sx={{ color: "#f97316" }} />, label: "Leave Tracker", link: "/pages/tables.html" },
  { icon: <CreditCardIcon sx={{ color: "#10b981" }} />, label: "Attendance", link: "/pages/attendance.html" },
  { icon: <AppsIcon sx={{ color: "#06b6d4" }} />, label: "Projects", link: "/pages/virtual-reality.html" },
  { icon: <PublicIcon sx={{ color: "#ef4444" }} />, label: "Payroll", link: "/pages/rtl.html" },
];

const accountItems = [
  { icon: <PersonIcon sx={{ color: "#3b82f6" }} />, label: "Profile", link: "/pages/profile.html" },
  { icon: <MilitaryTechIcon sx={{ color: "#06b6d4" }} />, label: "Performance", link: "/pages/sign-up.html" },
  { icon: <AutoAwesomeMotionIcon sx={{ color: "#f97316" }} />, label: "Reports", link: "/pages/sign-in.html" },
  { icon: <LogoutIcon sx={{ color: "#06b6d4" }} />, label: "Log Out", link: "/pages/sign-up.html" },
];

const DashBoardSidebar = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 240 },
        height: "100vh",
        backgroundColor: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        borderRadius: { sm: 2, xs: 0 },
        zIndex: 1000,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2, color: "#1e293b", textAlign: "center" }}
        >
          Dashboard
        </Typography>

        <Divider />

        <List>
          {menuItems.map(({ icon, label, link }, idx) => (
            <ListItem disablePadding key={idx}>
              <ListItemButton component="a" href={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {accountItems.map(({ icon, label, link }, idx) => (
            <ListItem disablePadding key={idx}>
              <ListItemButton component="a" href={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DashBoardSidebar;
