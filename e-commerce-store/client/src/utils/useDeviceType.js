import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType(); // Initial check
    window.addEventListener("resize", updateDeviceType);

    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  return deviceType;
};

export default useDeviceType;
