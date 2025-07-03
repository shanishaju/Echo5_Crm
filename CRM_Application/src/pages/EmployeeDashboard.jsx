import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa';

// const navItems = [
//   'Messenger', 'Feed', 'Collabs', 'Calendar', 'Online documents', 'Boards',
//   'Drive', 'Webmail', 'Workgroups', 'Tasks & Projects', 'CRM',
//   'Booking', 'Inventory', 'Marketing', 'Sites', 'e-Signature'
// ];

const navItems = [ "Login" ,"Leave" , "PTO" , "Attendance" , "Payroll" , "Reports" ];

function EmployeeDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' ,boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' , borderRadius: 2, backgroundColor: '#f8f9ff' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: 'rgb(255, 255, 255)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          m: 5,
          borderRadius: 2,
          border: '2px solid rgb(212, 215, 217)',
        }}
      >
        <Typography variant="h6" gutterBottom
        sx={{
          color:'white',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
          mt:5,
          p: 1,
          backgroundColor:"rgb(59, 59, 59)",
          borderRadius:3

        }}
        
        > Dashboard</Typography>
        <List
        sx={
          {
            color:'rgb(91, 123, 137)'
          }
          
        }
        >
          {navItems.map((text, index) => (
            <ListItem button key={index} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, borderRadius: 1 }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {/* <Box sx={{ mt: 'auto' }}>
          <Button variant="contained" color="success" fullWidth>Upgrade Plan</Button>
        </Box> */}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f8f9ff',
          p: 3,
          overflowY: 'auto',
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Chats</Typography>
          <Box sx={{ borderBottom: '1px solid #eee', py: 1 }}>
            <Typography variant="subtitle1"><strong>General chat</strong></Typography>
            <Typography variant="body2">Use the general chat to communicate.</Typography>
          </Box>
          <Box sx={{ py: 1 }}>
            <Typography variant="subtitle1"><strong>Notes</strong></Typography>
            <Typography variant="body2">Visible to you only</Typography>
          </Box>
        </Paper>

        <Box textAlign="center">
          <Typography variant="h5" fontWeight={600}>CRM: your ultimate workspace</Typography>
          <Typography variant="body2" mt={1}>Chats · Calls · Channels · Documents · Tasks · Calendar · Files · Boards</Typography>
          
          <Box mt={3}>
            <Button variant="outlined">Invite a team</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmployeeDashboard;
