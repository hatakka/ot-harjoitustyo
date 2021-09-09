import React from 'react'

const Weather = ({country, weather}) => {

    if (weather != null) {
        const current = weather.current
        return (
            <div>
                <h2>Wheather in {country.capital}</h2>
                <div>
                    <b>temperature:</b> {current.temperature} Celsius
                </div>
                <div>
                    <img src={current.weather_icons} alt="The weather in capital" height="100px"/>
                </div>
                <div>
                    <b>wind:</b> {current.wind_speed} mph {current.wind_dir}
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }
}

const CountryDetails = ({country, weather}) => {
    console.log(country)
    if (country != null) {
        
        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>Spoken languages</h2>
                <div>
                <ul>
                    {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                </div>
                <div>
                    <img src={country.flag} alt="The flag of the country" height="100px"/>
                    <br />
                </div>
                <div>
                    <Weather key={country.capital} country={country} weather={weather} />
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