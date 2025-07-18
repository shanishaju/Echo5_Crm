import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import DashBoardSidebar from '../Sidebar/DashBoardSidebar';
import { changePasswordApi } from '../../services/allapi';
import { toast } from 'sonner';

function ProfileSettings() {
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    // Get user info from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
      mode: 'onChange'
  });

  // Live watch of newPassword field
  const newPasswordValue = useWatch({
    control,
    name: 'newPassword',
  });

  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('success');

  // Clear message when user starts typing
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000); // Clear message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const onSubmit = async (data) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        setMessageType('error');
        setMessage('New passwords do not match.');
        return;
      }

      // Call the backend API
      const response = await changePasswordApi({
        currentPassword,
        newPassword
      });

      if (response?.status === 200) {
        setMessageType('success');
        setMessage('Password successfully changed.');
        toast.success('Password changed successfully!');
        reset();
      } else {
        setMessageType('error');
        setMessage(response?.response?.data?.message || 'Failed to change password.');
        toast.error(response?.response?.data?.message || 'Failed to change password.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('An error occurred while changing password.');
      toast.error('An error occurred while changing password.');
      console.error('Password change error:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashBoardSidebar />

      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto', mt: 6, flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Profile Settings
        </Typography>

        {userInfo && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {userInfo.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Employee ID:</strong> {userInfo.employeeId || 'N/A'}
            </Typography>
          </Box>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
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
            rules={{ 
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="New Password"
                type="password"
                margin="normal"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message || 'Password must be at least 6 characters with uppercase, lowercase, number, and special character'}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Please confirm your new password',
              validate: value =>
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
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
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
