import { useState, useEffect } from 'react';

const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: '',
    browser: '',
    browserVersion: '',
    appVersion: '',
    timeZone: '',
    browserScreenSize: { width: 0, height: 0 },
    deviceScreenSize: { width: 0, height: 0 }
  });

  useEffect(() => {
    const getOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes("win")) return "Windows";
      if (userAgent.includes("mac")) return "MacOS";
      if (userAgent.includes("linux")) return "Linux";
      if (userAgent.includes("android")) return "Android";
      if (userAgent.includes("ios")) return "iOS";
      return "Unknown OS";
    };

    const getBrowser = () => {
      const ua = navigator.userAgent;
      let browser = "Unknown";
      let version = "Unknown";

      if (ua.includes("Firefox/")) {
        browser = "Firefox";
        version = ua.split("Firefox/")[1];
      } else if (ua.includes("Chrome/")) {
        browser = "Chrome";
        version = ua.split("Chrome/")[1].split(" ")[0];
      } else if (ua.includes("Safari/")) {
        browser = "Safari";
        version = ua.split("Version/")[1].split(" ")[0];
      } else if (ua.includes("MSIE ")) {
        browser = "Internet Explorer";
        version = ua.split("MSIE ")[1].split(";")[0];
      } else if (ua.includes("Edg/")) {
        browser = "Edge";
        version = ua.split("Edg/")[1];
      }

      return { browser, version };
    };

    const { browser, version } = getBrowser();

    setSystemInfo({
      os: getOS(),
      browser: browser,
      browserVersion: version,
      appVersion: navigator.appVersion,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      browserScreenSize: { width: window.innerWidth, height: window.innerHeight },
      deviceScreenSize: { width: window.screen.width, height: window.screen.height }
    });
  }, []);

  return systemInfo;
};

export default useSystemInfo;