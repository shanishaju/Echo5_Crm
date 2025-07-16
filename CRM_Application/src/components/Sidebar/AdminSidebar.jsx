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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PaidIcon from "@mui/icons-material/Paid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const adminMenuItems = [
  { icon: <PeopleAltIcon />, label: "Employees", link: "/employees" },
  { icon: <PersonAddIcon />, label: "Add Employee", link: "/add-employee" },
  { icon: <AssessmentIcon />, label: "Add Admin", link: "/add-admin" },

  { icon: <DashboardIcon />, label: "Manage Project", link: "/manage-project" },
  { icon: <AssessmentIcon />, label: "Reports", link: "/reports" },
  { icon: <CreditCardIcon />, label: "Attendance", link: "/attendance" },
  {
    icon: <AssignmentTurnedInIcon />,
    label: "Leave Management",
    link: "/Manage-Leave",
  },
  { icon: <PaidIcon />, label: "Payroll", link: "/payroll" },
  { icon: <LogoutIcon />, label: "Logout", link: "/logout" },
];

const SidebarContent = ({ isDark }) => (
  <>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
      Admin Menu
    </Typography>
    <List>
      {adminMenuItems.map((item, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton component="a" href={item.link}>
            <ListItemIcon sx={{ color: isDark ? "#f8fafc" : "#1e293b" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
);

function AdminSidebar() {
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
              aria-label="open drawer"
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
}

export default AdminSidebar;
