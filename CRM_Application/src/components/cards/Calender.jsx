import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Calender() {
  const [value, setValue] = useState(new Date());

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ py: 2 }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            transform: 'scale(1.01)', 
            transformOrigin: 'top left',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 2,
            p: 2,
            minWidth: 360,
            '& .MuiPickersDay-root': {
              width: 42,
              height: 32,
            },
            '& .MuiTypography-root': {
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default Calender;
