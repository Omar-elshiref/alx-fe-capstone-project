import axios from "axios";

export const FetchWeatherDataByCoordinates = async (lat, lon) => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_APP_ID
  }`;

  try {
    const response = await axios.get(url);
    const res = response.data;
    return {
    cityName: res[0].name,
    };
  } catch (erro) {
    throw new Error(console.log(erro));
  }

};
