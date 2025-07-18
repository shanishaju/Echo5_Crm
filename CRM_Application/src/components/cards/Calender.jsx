import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Tooltip,
  IconButton,
  Stack,
  Grid
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns';

// Sample holidays with custom colors
const holidays = [
  { date: new Date('2025-01-26'), name: 'Republic Day', color: '#ff6b35', type: 'national' },
  { date: new Date('2025-08-15'), name: 'Independence Day', color: '#ff6b35', type: 'national' },
  { date: new Date('2025-10-02'), name: 'Gandhi Jayanti', color: '#ff6b35', type: 'national' },
  { date: new Date('2025-12-25'), name: 'Christmas', color: '#e74c3c', type: 'religious' },
  { date: new Date('2025-07-17'), name: 'Company Annual Day', color: '#9b59b6', type: 'company' },
  { date: new Date('2025-11-07'), name: 'Diwali', color: '#f39c12', type: 'religious' },
  { date: new Date('2025-03-14'), name: 'Holi', color: '#e91e63', type: 'religious' },
  { date: new Date('2025-05-01'), name: 'Labour Day', color: '#27ae60', type: 'public' },
];

function Calender() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(new Date());
  const theme = useTheme();

  // Navigation handlers
  const handlePrevMonth = () => {
    setDisplayDate(subMonths(displayDate, 1));
  };

  const handleNextMonth = () => {
    setDisplayDate(addMonths(displayDate, 1));
  };

  // Get days for the current month
  const monthStart = startOfMonth(displayDate);
  const monthEnd = endOfMonth(displayDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get holiday for a specific date
  const getHoliday = (date) => {
    return holidays.find(holiday => isSameDay(date, holiday.date));
  };

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDisplayDate(date);
  };

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box display="flex" justifyContent="center" height="100%">
      <Paper
        elevation={4}
        sx={{
          px: 2,
          py: 3,
          width: '100%',
          height: '100%',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Header with navigation */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 'bold',
              color: '#4fd1c7',
              fontSize: '1.5rem'
            }}
          >
            {format(displayDate, "MMMM yyyy")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handlePrevMonth}
              size="small"
              sx={{
                color: '#4fd1c7',
                backgroundColor: 'rgba(79, 209, 199, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(79, 209, 199, 0.2)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNextMonth}
              size="small"
              sx={{
                color: '#4fd1c7',
                backgroundColor: 'rgba(79, 209, 199, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(79, 209, 199, 0.2)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ChevronRight />
            </IconButton>
          </Stack>
        </Box>

        {/* Day headers */}
        <Box display="flex" mb={1}>
          {dayNames.map((day) => (
            <Box key={day} flex={1} display="flex" justifyContent="center">
              <Typography
                variant="caption"
                sx={{
                  color: '#4fd1c7',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textAlign: 'center',
                }}
              >
                {day}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Calendar Grid */}
        <Box sx={{ flexGrow: 1 }}>
          <Box display="flex" flexDirection="column" gap={0.5}>
            {/* Create rows of 7 days each */}
            {Array.from({ length: Math.ceil((monthStart.getDay() + daysInMonth.length) / 7) }).map((_, weekIndex) => (
              <Box key={weekIndex} display="flex" gap={0.5}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dayNumber = weekIndex * 7 + dayIndex;
                  const isEmptyCell = dayNumber < monthStart.getDay();
                  const dateIndex = dayNumber - monthStart.getDay();
                  const date = isEmptyCell ? null : daysInMonth[dateIndex];
                  
                  if (!date && !isEmptyCell) {
                    // Empty cell after month ends
                    return (
                      <Box key={dayIndex} flex={1} display="flex" justifyContent="center">
                        <Box sx={{ width: 32, height: 32 }} />
                      </Box>
                    );
                  }
                  
                  if (isEmptyCell) {
                    // Empty cell before month starts
                    return (
                      <Box key={dayIndex} flex={1} display="flex" justifyContent="center">
                        <Box sx={{ width: 32, height: 32 }} />
                      </Box>
                    );
                  }
                  
                  const holiday = getHoliday(date);
                  const isSelected = isSameDay(date, selectedDate);
                  const isTodayDate = isToday(date);
                  
                  return (
                    <Box key={dayIndex} flex={1} display="flex" justifyContent="center">
                      <Tooltip
                        title={
                          holiday ? (
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {holiday.name}
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)} Holiday
                              </Typography>
                            </Box>
                          ) : ""
                        }
                        arrow
                        placement="top"
                      >
                        <Box
                          onClick={() => handleDateClick(date)}
                          sx={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            color: 'white',
                            backgroundColor: holiday ? holiday.color : 'transparent',
                            border: isTodayDate ? '2px solid #4fd1c7' : 'none',
                            ...(isSelected && {
                              backgroundColor: '#4fd1c7',
                              color: '#1e3c72',
                              fontWeight: 'bold',
                            }),
                            '&:hover': {
                              backgroundColor: holiday ? holiday.color : 'rgba(79, 209, 199, 0.2)',
                              transform: 'scale(1.1)',
                              transition: 'all 0.2s ease-in-out',
                              ...(holiday && {
                                opacity: 0.8,
                              }),
                            },
                            transition: 'all 0.2s ease-in-out',
                            position: 'relative',
                            ...(holiday && {
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 2,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 4,
                                height: 4,
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              },
                            }),
                          }}
                        >
                          {format(date, 'd')}
                        </Box>
                      </Tooltip>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Legend */}
        <Box mt={2} pt={2} borderTop="1px solid rgba(79, 209, 199, 0.3)">
          <Typography variant="caption" sx={{ color: '#4fd1c7', fontWeight: 'bold', mb: 1, display: 'block' }}>
            Public Holidays
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#ff6b35" />
              <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem' }}>
                National
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#e74c3c" />
              <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem' }}>
                Religious
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#9b59b6" />
              <Typography variant="caption" sx={{ color: 'white', fontSize: '0.7rem' }}>
                Company
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default Calender;
