import React from 'react'

const Country = ({country}) => {
    return (
      <div>
        {country.name}
      </div>
    );
  }
  
  const CountryDetails = ({country}) => {
    return (
      <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <div>
          <ul>
            {country.languages.map(language =>
              <li>{language.name}</li>
            )}
          </ul>
        </div>
        <div>
          <img src={country.flag} alt="The flag of the country" width="100px" height="100px" align="left"/>
        </div>
      </>
    );
  }
  
const Countries = ({countries, filterCountries}) => {
    const countriesToShow = filterCountries.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))
    if (countriesToShow.length > 10) {
      return (
        <>
          Too many matches, specify another filter
        </>
      )

    } else if (countriesToShow.length === 1) {
      return (
        <>
            {countriesToShow.map(country =>
                <CountryDetails key={country.name} country={country} />
          )}
        </>
      )
    } else {

      return (
          <>
            {countriesToShow.map(country =>
                <Country key={country.name} country={country} />
            )}
          </>
      )
    }
}

export default Countries