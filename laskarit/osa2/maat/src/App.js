import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilter] = useState('')
  const [countryToShow, setCountry] = useState(null)
  const [weather, setWeather] = useState(null) 

  let detailedCountry = countryToShow;

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let capital = null
    if (countryToShow != null) {
       capital = countryToShow.capital
    } else if (filterCountries.length != 0) {
      const filtered = countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))
      if (filtered.length === 1) {
        capital = filtered[0].capital
      }
    }
    if (capital != null) {
      const api_key = process.env.REACT_APP_API_KEY
      console.log('weather effect for ', capital)
      const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query='+ capital
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [countryToShow, filterCountries])


  const countriesToShow = filterCountries.length === 0
  ? countries
  : countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))

  const setCountryToShow = ({country}) => {
    console.log(country)
    setCountry(country)
  }

  const filterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setCountry(null)
  }

  if (countriesToShow.length === 1) {
    const [country] = countriesToShow
    console.log("Setting country to show ", country)
    detailedCountry = country;
  }

  if (detailedCountry != null) {
    return (
      <div className="App">
          <Filter key="filter" filterCountries={filterCountries} filterChange={filterChange} />
          <Countries key="countries" countries={countriesToShow} setCountryToShow={setCountryToShow} />
          <CountryDetails key="countryDetails" country={detailedCountry} weather={weather}/> 
      </div>
    );
  } else {
    return (
      <div className="App">
          <Filter key="filter" filterCountries={filterCountries} filterChange={filterChange} />
          <Countries key="countries" countries={countriesToShow} setCountryToShow={setCountryToShow} />
      </div>
    );
  }
}

export default App;
