import axios from "axios";
import { useState } from "react";
import { useMap } from "react-leaflet";
import { API_KEY } from "../configs/KEYS";

export const useGeolocation = (defaultPosition = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return {
    isLoading,
    position,
    error,
    getPosition,
  };
};

export const getCurrentAddress = async (lat, long) => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&${API_KEY}`
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
