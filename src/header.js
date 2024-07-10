import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import UserMenu from './userMenue';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mr', name: 'Marathi' },
  { code: 'pa', name: 'Punjabi' }
];

const Header = ({ onSearch, onCityChange, savedCities, onDeleteCity, user }) => {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const handleCityClick = (city) => {
    onCityChange(city);
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
    setSearchValue(''); // Clear search value
  };

  return (
    <AppBar className="HeaderContainer" position="static"
      sx={{ backgroundColor: "white", color: 'black', borderRadius: 3 }}
      elevation={5} style={{ marginTop: 20 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: ['column', 'row'], 
        alignItems: 'center',
        alignContent: 'center',
        padding: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" style={{ marginRight: 10 }}>
            {('savedCities')}
          </Typography>
          <Select
            value=""
            onChange={(event) => {
              const selectedCity = event.target.value;
              if (selectedCity) {
                handleCityClick(selectedCity);
              }
            }}
          >
            <MenuItem disabled value="">
              {t('selectCity')}
            </MenuItem>
            {savedCities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCity(city)
                }} size="small" style={{ marginLeft: '5px' }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Right side - Language selector and Search input */}
        <Box style={{ display: "flex" }}>
          {/* Language selector */}
          <Select defaultValue="English" onChange={changeLanguage} sx={{ marginRight: '10px' }}>
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.name}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>

          {/* Search input */}
          <TextField
            variant="outlined"
            placeholder={t('searchPlaceholder')}
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box>
          {user && <UserMenu user={user} />}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
