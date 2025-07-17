import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Tooltip
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { format, isSameDay } from 'date-fns';

// Sample holidays
const holidays = [
  { date: new Date('2025-01-26'), name: 'Republic Day' },
  { date: new Date('2025-08-15'), name: 'Independence Day' },
  { date: new Date('2025-10-02'), name: 'Gandhi Jayanti' },
  { date: new Date('2025-12-25'), name: 'Christmas' },
  { date: new Date('2025-07-17'), name: 'Company Annual Day' },
];

function Calender() {
  const [value, setValue] = useState(new Date());
  const theme = useTheme();

  const formattedDate = format(value, "EEE, MMM dd yyyy");

  // Custom Day Renderer to highlight holidays
  const renderHolidayDay = (date, selectedDates, pickersDayProps) => {
    const holiday = holidays.find(holiday =>
      isSameDay(date, holiday.date)
    );

    if (holiday) {
      return (
        <Tooltip title={holiday.name} arrow>
          <PickersDay
            {...pickersDayProps}
            sx={{
              backgroundColor: theme.palette.warning.light,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.warning.main,
              },
            }}
          />
        </Tooltip>
      );
    }

    return <PickersDay {...pickersDayProps} />;
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={4}
        sx={{
          px: 3,
          py: 4,
          minWidth: 360,
          maxWidth: 420,
          width: '100%',
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          {formattedDate}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderDay={renderHolidayDay}
            sx={{
              '& .MuiPickersDay-root': {
                width: 42,
                height: 38,
                fontWeight: 500,
              },
              '& .MuiPickersCalendarHeader-label': {
                fontWeight: 600,
                fontSize: '1rem',
              },
              '& .MuiTypography-root': {
                fontFamily: 'Roboto, sans-serif',
              },
            }}
          />
        </LocalizationProvider>
      </Paper>
    </Box>
  );
}

export default Calender;
