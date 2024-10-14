// components
import WeatherCard from "./components/WeatherCard";
import DataByLocation from "./components/DataByLocation";


// Notification Library toastify
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className='min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white'>
        <WeatherCard />
        <DataByLocation />
      <ToastContainer autoClose={5000} theme="light" />
    </div>
  );
}

export default App;
