import React from 'react'

const Person = ({person}) => {
    return (
      <div>
        {person.name}&nbsp;{person.number}
      </div>
    );
  }
  
const Persons = ({persons, filterNumbers}) => {
    const personsToShow = filterNumbers.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNumbers.toLowerCase()))


    return (
        <>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} />
        )}
        </>
    )
}

export default Persons