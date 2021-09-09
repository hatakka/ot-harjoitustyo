import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilter] = useState('')
  const [countryToShow, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = filterCountries.length === 0
  ? countries
  : countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))

  let detailedCountry = countryToShow;

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

  return (
    <div className="App">
        <Filter key="filter" filterCountries={filterCountries} filterChange={filterChange} />
        <Countries key="countries" countries={countriesToShow} setCountryToShow={setCountryToShow} />
        <CountryDetails key="countryDetails" country={detailedCountry} /> 
  </div>
  );
}

export default App;
