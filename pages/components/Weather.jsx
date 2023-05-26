import Image from 'next/image'
import React from 'react'

const Weather = ({ data, forecast }) => {
  const dailyTemperatures = Array.isArray(forecast?.list)
    ? forecast.list.filter((item, index) => index % 8 === 0)
    : []

  if (!data || !data.weather || !data.main) {
    return <div>Loading...</div>
  }

  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-white z-10'>
      {/* Top */}
      <div className='relative flex justify-between pt-12'>
        <div className='flex flex-col items-center'>
          {data.weather[0]?.icon && (
            <Image
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt='Weather Icon'
              width={100}
              height={100}
            />
          )}
          <p className='text-2xl'>{data.weather[0]?.main}</p>
        </div>
        <p className='text-8xl'>{data.main.temp.toFixed(0)}&#176;</p>
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
      <div className='flex flex-wrap'>
        {dailyTemperatures.map((item) => (
          <div key={item.dt} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4'>
            {/* Render temperature for each day */}
            <p className='font-bold'>{formatDate(item.dt)}</p>
            <p>{convertKelvinToFahrenheit(item.main.temp)}°</p>
            {item.weather && item.weather.length > 0 && item.weather[0]?.icon && (
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
  const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32
  return fahrenheit.toFixed(0)
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const options = { month: 'short', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export default Weather
