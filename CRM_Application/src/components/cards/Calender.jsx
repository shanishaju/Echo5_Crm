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
      sx={{ minHeight: 700,py:2 }} 
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 1,
            '& .MuiPickersDay-root': {
              fontWeight: 'bold',
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default Calender;
