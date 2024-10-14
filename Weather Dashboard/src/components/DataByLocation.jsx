// This function's purpose is to fetch the city name using its latitude and longitude
// and store the city name in localStorage

// Import data from api
import { FetchWeatherDataByCoordinates } from "../services/WeatherService2";

// Import Hooks from react
import { useState, useEffect, useCallback } from "react";

// Notification Library toastify
import { toast } from "react-toastify";

const DataByLocation = () => {
  // Data storage within the state
  const [data, setData] = useState(null);

  // A function to fetch data based on geographic location
  const apiDataByLocation = async (lat, lon) => {
    try {
      const weatherData = await FetchWeatherDataByCoordinates(lat, lon); // Fetching data using latitude and longitude
      setData(weatherData); // store the data within the state

      // notification every time data is successfully fetched
      toast.success("Location data fetched successfully", {
        toastId: "error1",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // A function to get the user location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          apiDataByLocation(latitude, longitude); // Send latitude and longitude data to the function apiDataByLocation
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  // Execute on component load only
  useEffect(() => {
    getUserLocation(); // Get the user location when the page loads
  }, [getUserLocation]);

  return (
    <>{data && localStorage.setItem("currentCityLocation", data.cityName)}</>
  );
};

export default DataByLocation;
