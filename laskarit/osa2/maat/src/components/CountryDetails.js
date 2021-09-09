import React from 'react'
  
const CountryDetails = ({country}) => {
    console.log(country)
    if (country != null) {
        return (
        <>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <div>
            <ul>
                {country.languages.map(language =>
                <li key={language.name}>{language.name}</li>
                )}
            </ul>
            </div>
            <div>
            <img src={country.flag} alt="The flag of the country" width="100px" height="100px" align="left"/>
            </div>
        </>
        );
    } else {
        return (
        <></>
        )
    }
}

export default CountryDetails