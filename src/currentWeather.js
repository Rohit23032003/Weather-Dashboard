import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useTranslation } from 'react-i18next';

const CurrentWeather = ({ weather, savedCities , setSavedCities}) => {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(savedCities.includes(weather.name));
  }, [weather.name, savedCities]);

  const handleSaveCity = () => {
    const savedCitiesUpdated = [...savedCities, weather.name];
    setSavedCities(savedCitiesUpdated);
    localStorage.setItem('savedCities', JSON.stringify(savedCitiesUpdated));
    setIsSaved(true);
    alert(`Save ${weather.name} to List`);
  };

  return (
    <Card sx={{ mt: 2 }} elevation={10}>
      <CardContent>
        <Typography variant="h4">{weather.name}, {weather.sys.country}</Typography>
        <Typography variant="h5">{weather.weather[0].main}</Typography>
        <Typography variant="h2">{Math.round(weather.main.temp)}°</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <WbSunnyIcon />
              <Typography variant="body1" ml={1}>{t('realFeel')}: {Math.round(weather.main.feels_like)}°</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <OpacityIcon />
              <Typography variant="body1" ml={1}>{t('humidity')}: {weather.main.humidity}%</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <AirIcon />
              <Typography variant="body1" ml={1}>{t('wind')}: {weather.wind.speed} km/h</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <WbTwilightIcon />
              <Typography variant="body1" ml={1}>{t('rise')}: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <WbTwilightIcon />
              <Typography variant="body1" ml={1}>{t('set')}: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <WbSunnyIcon />
              <Typography variant="body1" ml={1}>{t('high')}: {Math.round(weather.main.temp_max)}°</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <WbSunnyIcon />
              <Typography variant="body1" ml={1}>{t('low')}: {Math.round(weather.main.temp_min)}°</Typography>
            </Box>
          </Grid>
        </Grid>
        {!isSaved ? (
          <Button variant="contained" color="primary" onClick={handleSaveCity} sx={{ mt: 2 }}>Save City</Button>
        ) : (
          <Button variant="contained" disabled sx={{ mt: 2 }}>Saved</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
