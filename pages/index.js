import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { icons } from 'react-icons'




export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const url= `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`


  const getWeather = (e) => {
    e.preventDefault()
    axios.get(url).then((response) => {
      setWeather(response.data)
      console.log(response.data)
    })
    setCity('')
  };
  return (
    <div>
      <Head>
        <title>Weather App- Nextjs</title>
        <link rel='icon' href='/favicon.ico' />
        </Head>

        <button onClick={getWeather}>Fetch Weather Data</button>
    </div>
  )
}
