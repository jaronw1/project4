import Image from 'next/image';
import React from 'react';

const Weather = ({ data }) => {
  console.log(data);
  return (
    <div>
      {/* Top */}
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='/'
            width='100'
            height='100'
          />
          <p >{data.weather[0].main}</p>
        <p >{data.main.temp.toFixed(0)}&#176;</p>

      
      {/* Bottom */}
      <div>
        <p>Weather in {data.name}</p>
        <div >
          <WeatherInfo label='Feels Like' value={`${data.main.feels_like.toFixed(0)}°`} />
          <WeatherInfo label='Humidity' value={`${data.main.humidity}%`} />
          <WeatherInfo label='Winds' value={`${data.wind.speed.toFixed(0)} MPH`} />
        </div>
      </div>
    </div>
  );
};

const WeatherInfo = ({ label, value }) => (
  <div>
    <p className='font-bold text-2xl'>{value}</p>
    <p className='text-xl'>{label}</p>
  </div>
);

export default Weather;
