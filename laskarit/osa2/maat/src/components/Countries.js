import React from 'react'

const Country = ({country, handleClick}) => {
  console.log("Params ", country, handleClick)
    return (
      <div>
        {country.name}
        <Button key={country.name} handleClick={handleClick} country={country} />
      </div>
    );
  }
  
const Button = ({handleClick, country}) => {
  return (
    <>
      <button onClick={() => handleClick(country={country})}>show</button> 
    </>
  )   
}
  
const Countries = ({countries, setCountryToShow}) => {
 
    if (countries.length > 10) {
      return (
        <>
          Too many matches, specify another filter
        </>
      )
    } else if (countries.length > 1) {
      return (
        <>
          {countries.map(country => (
            <Country key={country.name} country = {country} handleClick={setCountryToShow}/>
            ))}
        </>
      )
    } else {
      return (
        <>
        </>
      )     
    }
}

export default Countries