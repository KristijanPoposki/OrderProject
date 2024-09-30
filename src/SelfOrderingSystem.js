import React, { useState } from 'react';
import CarouselComponent from './carouselComponents';
import { localization } from './localization';
import { requestTypes } from './requestTypes';
import useGeolocation from './useGeolocation';
import useSystemInfo from './useSystemInfo';
import useNotification from './useNotification';

const SelfOrderingSystem = () => {
  const [order, setOrder] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');

  const { location, locationError } = useGeolocation(language);
  const systemInfo = useSystemInfo();
  const { sendNotification, requestNotificationPermission } = useNotification();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name) {
      alert(localization[language].enterName);
      return;
    }

    if (!location.accuracy || location.accuracy > 200000) {
      alert(localization[language].gpsIssue);
      return;
    }

    const selectedRequest = requestTypes.find((req) => req.id === order);
    const requestDescription = selectedRequest ? selectedRequest.localization[language] : '';

    const orderData = {
      name: name,
      request: {
        id: order,
        description: {
          en: selectedRequest.localization.en,
          mk: selectedRequest.localization.mk
        }
      },
      location: location,
      language: language,
      systemInfo: systemInfo
    };

    console.log('Order Data:', orderData);

    alert(`${localization[language].orderPlaced}\n${localization[language].name}: ${name}\n${localization[language].request}: ${requestDescription}`);
    
    sendNotification('Order Update', 'The waiter has arrived');

    setOrder('');  
    setName('');   
  };

  const handleLanguageToggle = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'mk' : 'en');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <CarouselComponent />
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Self Ordering System</h1>
      
      <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Name input */}
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

        {/* Order selection */}
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

        {/* Submit button */}
        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {localization[language].placeOrder}
        </button>
      </form>

      {/* Language toggle button */}
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