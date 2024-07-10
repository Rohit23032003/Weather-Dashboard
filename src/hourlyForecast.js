import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getWeatherIcon } from './weatherIcons';

const HourlyForecast = ({ forecast }) => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Initially select the first day
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  useEffect(() => {
    // Function to get the next 5 days
    const getNext5Days = () => {
      const today = new Date();
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const next5Days = [];

      for (let i = 0; i < 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        next5Days.push(weekdays[nextDay.getDay()]);
      }
      return next5Days;
    };

    setDays(getNext5Days());
  }, []);

  useEffect(() => {
    // Function to filter hourly forecasts for the selected day
    const filterHourlyForecasts = () => {
      if (forecast.length === 0) return; // Handle case where forecast data is not available
      const selectedDay = days[selectedDayIndex];
      // Filter hourly forecasts for the selected day
      const filteredHours = forecast.filter(hour => {
        const forecastDay = new Date(hour.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        return forecastDay === selectedDay;
      });

      setHourlyForecasts(filteredHours);
    };

    filterHourlyForecasts();
  }, [forecast, days, selectedDayIndex]);

  const handleDaySelect = (index) => {
    setSelectedDayIndex(index);
  };

  return (
    <Card sx={{ mt: 2 }} elevation={10}>
      <CardContent>
        <Typography variant="h5">{t('hourlyForecast')}</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Display day names */}
          <Grid item xs={12}>
            {days.map((day, index) => (
              <Button
                key={index}
                onClick={() => handleDaySelect(index)}
                sx={{
                  bgcolor: selectedDayIndex === index ? 'green' : 'inherit',
                  color: selectedDayIndex === index ? 'white' : 'inherit',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: selectedDayIndex === index ? 'green' : 'lightgreen',
                  },
                }}
              >
                {day}
              </Button>
            ))}
          </Grid>

          {/* Display hourly forecast for the selected day */}
          {hourlyForecasts.map((hour, index) => (
            <Grid item xs={2} key={index}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body1">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                {getWeatherIcon(hour.weather[0].id)}
                <Typography variant="body1">{Math.round(hour.main.temp)}°</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
