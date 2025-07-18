import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DashBoardSidebar from '../Sidebar/DashBoardSidebar';

function ProfileSettings() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const newPasswordValue = watch('newPassword');
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('success');

  const onSubmit = (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setMessageType('error');
      setMessage('New passwords do not match.');
      return;
    }

    // Simulate backend call
    console.log('Password change request:', {
      currentPassword,
      newPassword
    });

    setMessageType('success');
    setMessage('Password successfully changed.');
    reset();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashBoardSidebar />

      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto', mt: 6, flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Security Settings
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Change Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            rules={{ required: 'Current password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Current Password"
                type="password"
                margin="normal"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{ required: 'New password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="New Password"
                type="password"
                margin="normal"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{ required: 'Please confirm your new password',validate: value =>
                value === newPasswordValue || 'Passwords do not match'
             }}
            
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm New Password"
                type="password"
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Change Password
          </Button>
        </Box>

        {message && (
          <Alert severity={messageType} sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default ProfileSettings;
