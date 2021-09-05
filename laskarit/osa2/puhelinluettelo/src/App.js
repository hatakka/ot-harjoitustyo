import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name}&nbsp;{person.number}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterNumbers, setFilter] = useState('')

  const personsToShow = filterNumbers.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterNumbers.toLowerCase()))

  const filterChange= (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let pos = -1

    persons.forEach(function(item, index, array) {
      if (item.name === newName) {
        pos = index
      }
    })
    if (pos >= 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
   
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
     }
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  console.log(filterNumbers)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value={filterNumbers} onChange={filterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
    </div>
  )

}

export default App
