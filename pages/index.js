import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from './components/Weather';
import Loading from './components/Loading';
import { createClient } from 'pexels';

const backgroundKey = process.env.NEXT_PUBLIC_PEXEL_KEY;


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState({});
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('')

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const geolocationUrl = 'https://api.openweathermap.org/geo/1.0/reverse'
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'
  const client = createClient(backgroundKey)

  const getBackgroundImage = async (city) => {
    try {
      const query = city;
      const photos = await client.photos.search({ query, per_page: 1 });
      if (photos?.photos?.length > 0) {
        const photo = photos.photos[0];
        setBackgroundImageUrl(photo.src.large2x);
      }
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  }

  useEffect(() => {
    fetchWeatherByGeolocation()
  }, [])

  const fetchWeatherByGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);

        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  

  

  const getWeatherByCoordinates = async (latitude, longitude) => {
    setLoading(true)

    try {
      const geolocationResponse = await axios.get(`${geolocationUrl}?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
      const city = geolocationResponse.data[0].name;
      setCity(city);
      await fetchWeather(city);
      await fetchForecast(latitude, longitude); // Call the function to fetch the forecast
      getBackgroundImage(city); // Fetch background image
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      setLoading(false)
    }
  };

  const fetchForecast = async (latitude, longitude) => {
    try {
      const forecastResponse = await axios.get(`${forecastUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      const forecastData = forecastResponse.data;
      setForecast(forecastData); // Set the forecast data in the state
    } catch (error) {
      console.error('Error getting forecast:', error);
    }
  };

  const getWeather = async (e) => {
    e.preventDefault()
    await fetchWeather(city);
    getBackgroundImage(city); // Fetch background image
  }

  const fetchWeather = async (city) => {
    setLoading(true)

    try {
      const response = await axios.get(`${weatherUrl}?q=${city}&units=imperial&appid=${apiKey}`)
      setWeather(response.data);

      // Fetch the forecast for the new city
      await fetchForecast(response.data.coord.lat, response.data.coord.lon);
    } catch (error) {
      console.error('Error getting weather:', error);
    }

    setCity('')
    setLoading(false)
  }

  return (
    <div className="relative bg-blue-500">
      <Head>
        <title>Weather - Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]' />
      {/* Background image */}
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          fill
          style
          alt="weatherbackground"
        />
      )}

      {/* Search */}
      <div className='search-container relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-sky-400 z-10'>
        <form
          onSubmit={getWeather}
          className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-sky-400 text-white rounded-2xl'
        >
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              className='bg-transparent border-none text-white focus:outline-none text-2xl'
              type='text'
              placeholder='Search city'
              value={city}
            />
          </div>
          <button type='submit'>
            <BsSearch size={20} />
          </button>
        </form>
      </div>

      {/* Weather */}
      <div className="weather-container">
        {loading ? <Loading /> : weather.main && <Weather data={weather} forecast={forecast} />}
      </div>
    </div>
  )
}
