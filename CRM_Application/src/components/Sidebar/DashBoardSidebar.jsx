import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AppsIcon from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const drawerWidth = 240;

const menuItems = [
  { icon: <DashboardIcon />, label: "Home", link: "/dashboard" },
  { icon: <GroupAddIcon />, label: "Leave Tracker", link: "/apply-leave" },
  { icon: <CreditCardIcon />, label: "Attendance", link: "/my-attendance" },
  { icon: <AppsIcon />, label: "Projects", link: "/maintenance" },
  { icon: <PublicIcon />, label: "Payroll", link: "/maintenance" },
];

const accountItems = [
  { icon: <PersonIcon />, label: "Profile", link: "/maintenance" },
  { icon: <MilitaryTechIcon />, label: "Performance", link: "/maintenance" },
  { icon: <AutoAwesomeMotionIcon />, label: "Reports", link: "/maintenance" },
  { icon: <LogoutIcon />, label: "Log Out", link: "/maintenance" },
];

const SidebarContent = ({ isDark }) => (
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
            <ListItemIcon sx={{ color: isDark ? "#ffffff" : "#1e293b" }}>{icon}</ListItemIcon>
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
            <ListItemIcon sx={{ color: isDark ? "#ffffff" : "#1e293b" }}>{icon}</ListItemIcon>
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
);

const DashBoardSidebar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#f8fafc" : "#1e293b",
        p: 2,
      }}
    >
      <SidebarContent isDark={isDark} />
    </Box>
  );

  return (
    <>
      {/* Top AppBar for Mobile */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#ffffff",
            color: "#1e293b",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: "#1e293b" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
              color: isDark ? "#f8fafc" : "#1e293b",
              borderRight: "1px solid",
              borderColor: isDark ? "#374151" : "#e5e7eb",
            },
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>
    </>
  );
};

export default DashBoardSidebar;
