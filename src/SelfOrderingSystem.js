import React, { useState, useEffect } from 'react';

// Localization s
const localization = {
  en: {
    name: "Name",
    selectRequest: "Select Request",
    placeOrder: "Place Order",
    locationDetails: "Location Details",
    accuracy: "Accuracy",
    latitude: "Latitude",
    longitude: "Longitude",
    switchLanguage: "Switch to Macedonian",
    lowGpsAccuracy: "Your GPS accuracy is low. Please ensure better GPS signal.",
    unableToRetrieveLocation: "Unable to retrieve your location. Please check your device settings.",
    orderPlaced: "Order placed successfully!",
    enterName: "Please enter your name.",
    request: "Request",
    selectRequestOption: "--Select a request--",
    gpsIssue: "Unable to place order due to low GPS accuracy. Please improve your GPS signal and try again."
  },
  mk: {
    name: "Име",
    selectRequest: "Изберете барање",
    placeOrder: "Поднесете нарачка",
    locationDetails: "Детали за локацијата",
    accuracy: "Точност",
    latitude: "Ширина",
    longitude: "Должина",
    switchLanguage: "Префрли на англиски",
    lowGpsAccuracy: "Вашата GPS точност е ниска. Ве молиме осигурете се за подобар сигнал.",
    unableToRetrieveLocation: "Не можеме да ја добиеме вашата локација. Проверете ги подесувањата на уредот.",
    orderPlaced: "Нарачката е успешно поднесена!",
    enterName: "Ве молиме внесете го вашето име.",
    request: "Барање",
    selectRequestOption: "--Изберете барање--",
    gpsIssue: "Не можете да поднесете нарачка поради ниска GPS точност. Подобрете го сигналот и обидете се повторно."
  }
};

// Request types za dropdown
const requestTypes = [
  { id: "W", localization: { en: "Call Waiter", mk: "Повикај келнер" } },
  { id: "P", localization: { en: "Request Payment", mk: "Побарај сметка" } },
  { id: "C", localization: { en: "Custom Order", mk: "Нарачка по избор" } }
];

const SelfOrderingSystem = () => {
  const [order, setOrder] = useState('');
  const [location, setLocation] = useState({ accuracy: null, latitude: null, longitude: null });
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');

  // koristenje geolokacija
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { accuracy, latitude, longitude } = position.coords;
          setLocation({
            accuracy,
            latitude,
            longitude
          });

          if (accuracy > 20) {
            alert(localization[language].lowGpsAccuracy);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert(localization[language].unableToRetrieveLocation);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [language]);

  // proverka dokolku imeto e vneseno i location accuracy uslovot e ispolnot za naracka
  const handlePlaceOrder = (e) => {
    e.preventDefault();  
    if (!name) {
      alert(localization[language].enterName);
      return;
    }

    if (!location.accuracy || location.accuracy > 20) {
      alert(localization[language].gpsIssue);
      return;
    }

    const selectedRequest = requestTypes.find((req) => req.id === order);
    const requestDescription = selectedRequest ? selectedRequest.localization[language] : '';

    alert(`${localization[language].orderPlaced}\n${localization[language].name}: ${name}\n${localization[language].request}: ${requestDescription}\n${localization[language].accuracy}: ${location.accuracy.toFixed(2)} meters\n${localization[language].latitude}: ${location.latitude}\n${localization[language].longitude}: ${location.longitude}`);
    
    setOrder('');  
    setName('');   
  };

  // Menuvanje na mk i ang
  const handleLanguageToggle = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'mk' : 'en');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{localization[language].name}</h1>
      
      <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>{localization[language].name}:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div>
          <label htmlFor="order" style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>{localization[language].selectRequest}:</label>
          <select
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          >
            <option value="">{localization[language].selectRequestOption}</option>
            {requestTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.localization[language]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {localization[language].placeOrder}
        </button>
      </form>

      {location.accuracy && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontWeight: '600', fontSize: '18px' }}>{localization[language].locationDetails}:</h3>
          <p>{localization[language].accuracy}: {location.accuracy.toFixed(2)} meters</p>
          <p>{localization[language].latitude}: {location.latitude}</p>
          <p>{localization[language].longitude}: {location.longitude}</p>
        </div>
      )}

      <button 
        onClick={handleLanguageToggle} 
        style={{ marginTop: '16px', width: '100%', padding: '12px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {localization[language].switchLanguage}
      </button>
    </div>
  );
};

export default SelfOrderingSystem;

