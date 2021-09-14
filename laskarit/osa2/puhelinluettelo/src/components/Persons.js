import React from 'react'

const Person = ({person, removePerson}) => {
    return (
      <div>
        {person.name}&nbsp;{person.number}
        <button onClick={removePerson}>delete</button>
      </div>
    );
  }
  
const Persons = ({persons, filterNumbers, removePerson}) => {
    const personsToShow = filterNumbers.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNumbers.toLowerCase()))


    return (
        <>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} removePerson={() => removePerson(person)}/>
        )}
        </>
    )
}

export default Persons