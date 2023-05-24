import Image from 'next/image';
import React from 'react';

const Weather = ({ data }) => {
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

      <div>
        
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