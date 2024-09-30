import { useState, useEffect } from 'react';
import { localization } from './localization';

const useGeolocation = (language) => {
  const [location, setLocation] = useState({ accuracy: null, latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { accuracy, latitude, longitude } = position.coords;
          setLocation({ accuracy, latitude, longitude });

          if (accuracy > 200000) {
            setLocationError(localization[language].lowGpsAccuracy);
          } else {
            setLocationError(null);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError(localization[language].unableToRetrieveLocation);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [language]);

  return { location, locationError };
};

export default useGeolocation;