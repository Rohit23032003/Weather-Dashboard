import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export const   getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) {
    return <AcUnitIcon />; // Example for thunderstorm
  } else if (weatherId >= 300 && weatherId < 600) {
    return <BeachAccessIcon />; // Example for drizzle and rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return <AcUnitIcon />; // Example for snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return <CloudIcon />; // Example for atmosphere
  } else if (weatherId === 800) {
    return <WbSunnyIcon />; // Example for clear
  } else if (weatherId > 800) {
    return <CloudIcon />; // Example for clouds
  }
  return <WbSunnyIcon />;
};


