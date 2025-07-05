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
  useTheme,
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
  { icon: <DashboardIcon />, label: "Home", link: "/pages/dashboard.html" },
  { icon: <GroupAddIcon />, label: "Leave Tracker", link: "/pages/tables.html" },
  { icon: <CreditCardIcon />, label: "Attendance", link: "/pages/attendance.html" },
  { icon: <AppsIcon />, label: "Projects", link: "/pages/virtual-reality.html" },
  { icon: <PublicIcon />, label: "Payroll", link: "/pages/rtl.html" },
];

const accountItems = [
  { icon: <PersonIcon />, label: "Profile", link: "/pages/profile.html" },
  { icon: <MilitaryTechIcon />, label: "Performance", link: "/pages/sign-up.html" },
  { icon: <AutoAwesomeMotionIcon />, label: "Reports", link: "/pages/sign-in.html" },
  { icon: <LogoutIcon />, label: "Log Out", link: "/pages/sign-up.html" },
];

const DashBoardSidebar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: { xs: 70, sm: 240 },
        height: "100vh",
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#f8fafc" : "#1e293b",
        borderRight: "1px solid",
        borderColor: isDark ? "#374151" : "#e5e7eb",
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
          sx={{
            mb: 2,
            textAlign: "center",
            display: { xs: "none", sm: "block" },
            color: isDark ? "#f8fafc" : "#1e293b",
          }}
        >
          Dashboard
        </Typography>

        <Divider sx={{ display: { xs: "none", sm: "block" }, bgcolor: isDark ? "#334155" : "#cbd5e1" }} />

        <List>
          {menuItems.map(({ icon, label, link }, idx) => (
            <ListItem disablePadding key={idx}>
              <ListItemButton component="a" href={link}>
                <ListItemIcon sx={{ color: isDark ? "#ffffff" : "#1e293b" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    color: isDark ? "#f8fafc" : "#1e293b",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ display: { xs: "none", sm: "block" }, bgcolor: isDark ? "#334155" : "#cbd5e1" }} />

        <List>
          {accountItems.map(({ icon, label, link }, idx) => (
            <ListItem disablePadding key={idx}>
              <ListItemButton component="a" href={link}>
                <ListItemIcon sx={{ color: isDark ? "#ffffff" : "#1e293b" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    color: isDark ? "#f8fafc" : "#1e293b",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DashBoardSidebar;
