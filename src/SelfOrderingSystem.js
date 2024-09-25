import React, { useState, useEffect } from 'react';

const SelfOrderingSystem = () => {
  const [order, setOrder] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, []);

  const handleOrderItem = (item) => {
    setOrder([...order, item]);
  };

  const handlePlaceOrder = () => {
    if (!location) {
      alert('Unable to get your location. Please enable GPS and try again.');
      return;
    }

    alert(`Order placed successfully!\nItems: ${order.join(', ')}\nLocation: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`);
    setOrder([]); 
  };

  const getLocationAccuracy = () => {
    if (!location) return 'Unknown';
    if (location.accuracy <= 5) return 'High';
    if (location.accuracy <= 20) return 'Medium';
    return 'Low';
  };

  return (
    <div>
      <h1>Self-Ordering System</h1>
      <h2>Your Location</h2>
      {location ? (
        <div>
          <p>Latitude: {location.latitude.toFixed(6)}</p>
          <p>Longitude: {location.longitude.toFixed(6)}</p>
          <p>Accuracy: {getLocationAccuracy()} ({location.accuracy.toFixed(2)} meters)</p>
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
      <h2>Menu</h2>
      <button onClick={() => handleOrderItem('Burger')}>Add Burger</button>
      <button onClick={() => handleOrderItem('Fries')}>Add Fries</button>
      <button onClick={() => handleOrderItem('Soda')}>Add Soda</button>
      <br />
      <h2>Your Order</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default SelfOrderingSystem;
