import axios from "axios";

export const FetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
    import.meta.env.VITE_APP_ID
  }`;

  try {
    const response = await axios.get(url);
    const res = response.data;
    return {
      humidity: res.main.humidity,
      windSpeed: res.wind.speed,
      temperature: res.main.temp,
      cityName: res.name,
      icon: res.weather[0].icon,
      description: res.weather[0].description,
      country: res.sys.country,
      tempMin: res.main.temp_min,
      tempMax: res.main.temp_max,
      sunRise: res.sys.sunrise,
      timeZone: res.timezone,
      dt: res.dt,
    };
  } catch (erro) {
    throw new Error(console.log(erro));
  }
};
