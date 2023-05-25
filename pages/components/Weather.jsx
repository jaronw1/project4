import Image from 'next/image';
import React from 'react';

const Weather = ({ data, forecast }) => {
    console.log(forecast.list)
    const dailyTemperatures = Array.isArray(forecast?.list) ? forecast.list.filter((item, index) => index % 8 === 0) : []

  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-white z-10'>
      {/* Top */}
      <div className='relative flex justify-between pt-12'>
        <div className='flex flex-col items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='/'
            width='100'
            height='100'
          />
          <p className='text-2xl'>{data.weather[0].main}</p>
        </div>
        <p className='text-9xl'>{data.main.temp.toFixed(0)}&#176;</p>
      </div>
      
      {/* Bottom */}
      <div className='bg-sky-400/50 relative p-8 rounded-md'>
        <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
        <div className='flex justify-between text-center'>
          <WeatherInfo label='Feels Like' value={`${data.main.feels_like.toFixed(0)}°`} />
          <WeatherInfo label='Humidity' value={`${data.main.humidity}%`} />
          <WeatherInfo label='Winds' value={`${data.wind.speed.toFixed(0)} MPH`} />
        </div>
      </div>


      {/* Render forecast data */}
      {dailyTemperatures.map((item) => (
        <div key={item.dt}>
          {/* Render temperature for each day */}
          <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
          <p>Temperature: {convertKelvinToFahrenheit(item.main.temp)}°</p>
          {/* Add more information as needed */}
          {item.weather && item.weather.length > 0 && (
            <Image
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt='Weather Icon'
              width={50}
              height={50}
            />
          )}
        </div>
      ))}
    </div>
    


    
  )
}

const WeatherInfo = ({ label, value }) => (
  <div>
    <p className='font-bold text-2xl'>{value}</p>
    <p className='text-xl'>{label}</p>
  </div>
)
const convertKelvinToFahrenheit = (kelvin) => {
    const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return fahrenheit.toFixed(0);
  }

export default Weather;