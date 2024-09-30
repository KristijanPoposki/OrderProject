import { useState, useEffect } from 'react';

const useNotification = () => {
  const [notificationPermission, setNotificationPermission] = useState('default');

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio('/windows-notify.wav');
    audio.play().catch(error => console.error("Error playing audio:", error));
  };

  const sendNotification = (title, body) => {
    if (notificationPermission === 'granted') {
      const notification = new Notification(title, {
        body: body,
        icon: 'notification.jpg' // Replace with the path to your notification icon
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Vibrate for 200ms
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      playNotificationSound();
    } else if (notificationPermission === 'default') {
      requestNotificationPermission();
    }
  };

  return { sendNotification, requestNotificationPermission };
};

export default useNotification;