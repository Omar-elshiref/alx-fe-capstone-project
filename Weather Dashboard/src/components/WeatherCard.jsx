// Import icons
import SearchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import loadingIcon from "../assets/loading.png";
import location from "../assets/location.png";
import min from "../assets/down-arrow.png";
import max from "../assets/up-arrow.png";
import sunRise from "../assets/sunrise.png";

// Import data from api
import { FetchWeatherData } from "../services/WeatherService";

// Notification Library toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Hooks from react
import { useState, useEffect, useRef } from "react";

const WeatherCard = () => {
  // Data storage within the state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference to save the value of the input
  const inputRef = useRef();

  // Function to fetch data from API
  const apiData = async (city) => {
    // If a city name is not entered display this notification
    if (!city) {
      return toast.warn("Enter city name");
    }

    try {
      setLoading(true); // First start loading
      const weatherData = await FetchWeatherData(city); // Secondly call the data from Weather Service
      setData(weatherData); // Thirdly store the data within the state
      setLoading(false); // Fourth stop the loading
      setError(null); // Fifth Reset error to null
      localStorage.setItem("cityName", city); // Sixth, store the name of the city in local Storage

      // Seventh a notification every time data is successfully fetched
      toast.success("Data fetched successfully", {
        toastId: "success1",
      });
    } catch (erro) {
      // Handling and managing errors
      if (erro) {
        setError("No data to display");
        toast.error(`Data fetched error or name of the city is wrong`);
      }
      setLoading(false);
    }
  };

  // Using useEffect to manage any side effects
  useEffect(() => {
    // When the application starts for the first time Call the data
    const cityName = localStorage.getItem("cityName") || "london";
    apiData(cityName);

    // Set the interval to update the data every 3 minutes
    const interval = setInterval(() => {
      apiData(localStorage.getItem("cityName"));
    }, 180000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Handling loading
  if (loading) {
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'>
        <img
          src={loadingIcon}
          alt='loding icon'
          className='w-52 my-1 flex items-center justify-center animate-spin'
        />
      </div>
    );
  }

  // When there are error display these elements
  if (error) {
    return (
      <div className='p-4 flex items-center justify-around flex-col min-h-screen md:px-28'>
        <div className='flex flex-col items-center justify-around gap-5 lg:gap-16'>
          <h1 className='text-3xl lg:text-4xl'>Weather Dashboard</h1>
          <div className='flex items-center justify-center gap-3'>
            <input
              type='text'
              name='search'
              id='search'
              placeholder='Search'
              className='px-5 h-12 w-52 text-xl rounded-3xl border-none outline-none text-black capitalize placeholder:lowercase lg:w-64'
              ref={inputRef}
            />
            <img
              src={SearchIcon}
              alt='search icon'
              className='bg-white rounded-full p-3 cursor-pointer transition ease-out hover:scale-125'
              onClick={() => {
                apiData(inputRef.current.value);
              }}
            />
            <img
              src={location}
              alt='location icon'
              className='bg-white rounded-full p-3 cursor-pointer transition ease-out hover:scale-125'
              onClick={() => {
                if (!localStorage.getItem("currentCityLocation")) {
                  toast.error(
                    "Failed to get location. Please enable location services."
                  );
                } else {
                  apiData(localStorage.getItem("currentCityLocation"));
                } 
              }}
            />
          </div>
          <p className='text-2xl text-red-600 my-5 font-bold w-full text-center'>
            {error}
          </p>
        </div>
      </div>
    );
  }

  // Convert seconds to sun rise time
  let unix = data.sunRise;
  let time = new Date(unix * 1000);
  let hours = time.getHours();
  let minutes = time.getMinutes().toString().split("");
  if (minutes.length === 1) {
    minutes.unshift("0");
  } else if (minutes.length === 2) {
    minutes;
  }
  let minutesWasZero = minutes.join("");

  //Convert seconds to the actual time and day in the city
  let unixTime = data.dt + data.timeZone;
  let date = new Date(unixTime * 1000);
  let date2 = date.toUTCString();

  return (
    <div className='p-4 flex items-center justify-around flex-col min-h-screen md:px-28'>
      {/* Top of the screen */}
      <div className='flex flex-col items-center justify-around gap-5 md:flex-row lg:gap-16'>
        <h1 className='text-3xl lg:text-4xl'>Weather Dashboard</h1>
        <div className='flex items-center justify-center gap-3'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search'
            className='px-5 h-12 w-52 text-xl rounded-3xl border-none outline-none text-black capitalize placeholder:lowercase lg:w-64'
            ref={inputRef}
          />
          <img
            src={SearchIcon}
            alt='search icon'
            className='bg-white rounded-full p-3 cursor-pointer transition ease-out hover:scale-125'
            onClick={() => {
              apiData(inputRef.current.value);
            }}
          />
          <img
            src={location}
            alt='location icon'
            className='bg-white rounded-full p-3 cursor-pointer transition ease-out hover:scale-125'
            onClick={() => {
              if (!localStorage.getItem("currentCityLocation")) {
                toast.error(
                  "Failed to get location. Please enable location services."
                );
              } else {
                apiData(localStorage.getItem("currentCityLocation"));
              }
            }}
          />
        </div>
      </div>

      {/* center of the screen */}
      <div className='flex flex-col items-center my-5 md:flex-row md:gap-10 md:flex-wrap md:justify-center'>
        <p className='text-3xl capitalize md:w-1/4 md:order-1'>
          {data.description}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt='Icon'
          className='w-48 md:w-1/4 md:order-2'
        />
        <p className='text-7xl my-4 md:w-1/4 md:order-4 text-center'>
          {(data.temperature - 273.15).toFixed()}°C
        </p>
        <div className='flex flex-col items-center order-3 justify-center'>
          <p className='text-5xl'>{data.cityName}</p>
          <p className='text-2xl md:text-4xl'>{data.country}</p>
        </div>
      </div>

      {/* bottom of the screen */}
      <div className='flex justify-between items-center my-4 flex-wrap gap-5 lg:gap-8'>
        <div className='flex items-start gap-3 text-xl'>
          <img src={humidityIcon} alt='humidity icon' className='w-10 my-2' />
          <div>
            <p>{data.humidity} %</p>
            <span className='block text-sm'>Humidity</span>
          </div>
        </div>
        <div className='flex items-start gap-3 text-xl'>
          <img src={windIcon} alt='wind icon' className='w-10 my-2' />
          <div>
            <p>{data.windSpeed} Km/h</p>
            <span className='block text-sm'>Wind Speed</span>
          </div>
        </div>
        <div className='flex items-start gap-3 text-xl'>
          <img src={min} alt='humidity icon' className='w-10 my-2' />
          <div>
            <p>{(data.tempMin - 273.15).toFixed()}°C</p>
            <span className='block text-sm'>Temp min</span>
          </div>
        </div>
        <div className='flex items-start gap-3 text-xl mr-6 md:m-0'>
          <img src={max} alt='wind icon' className='w-10 my-2' />
          <div>
            <p>{(data.tempMax - 273.15).toFixed()}°C</p>
            <span className='block text-sm'>Temp max</span>
          </div>
        </div>
        <div className='flex items-start gap-2 text-xl m-auto md:m-0'>
          <img src={sunRise} alt='sun rise icon' className='w-14' />
          <div>
            <p>{`${hours} : ${minutesWasZero}`}</p>
            <span className='block text-sm'>Sun rise</span>
          </div>
        </div>
      </div>
      <div className='md:text-xl'>
        <span>
          Date and time in <span className='font-bold'>{data.cityName}</span>
        </span>
        <br />
        <span className='font-bold'>{date2}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
