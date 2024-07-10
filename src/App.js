// App.js
import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Alert } from '@mui/material';
import Header from './header.js';
import CurrentWeather from './currentWeather.js';
import HourlyForecast from './hourlyForecast.js';
import { fetchWeather, fetchForecast } from './api';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Auth.js';
// import UserMenu from './userMenue.js';
import { useParams } from 'react-router-dom';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [city, setCity] = useState('Berlin');
  const [error, setError] = useState(null);
  const [savedCities, setSavedCities] = useState(() => {
    const cities = JSON.parse(localStorage.getItem('savedCities')) || [];
    return cities;
  });
  const [user, setUser] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', Id));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [Id]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setError(null);
        const weather = await fetchWeather(city);
        setCurrentWeather(weather);

        const { lat, lon } = weather.coord;
        const forecastData = await fetchForecast({ lat, lon });
        const hourlyData = forecastData.list;
        setHourlyForecast(hourlyData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again.');
      }
    };

    getWeatherData();
  }, [city]);

  const handleSearch = async (searchCity) => {
    setCity(searchCity);
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  const handleDeleteCity = (cityToDelete) => {
    const updatedCities = savedCities.filter(city => city !== cityToDelete);
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    setSavedCities(updatedCities);
  };

  return (
    <Container>
      <CssBaseline />
      <Header
        onSearch={handleSearch}
        onCityChange={handleCityChange}
        savedCities={savedCities}
        onDeleteCity={handleDeleteCity}
        user={user}
      />
      {error && <Alert severity="error">{error}</Alert>}
      {/* {user && <UserMenu user={user} />} */}
      {currentWeather && <CurrentWeather weather={currentWeather} savedCities={savedCities} setSavedCities={setSavedCities} />}
      {hourlyForecast.length > 0 && <HourlyForecast forecast={hourlyForecast} />}
    </Container>
  );
};

export default App;
