import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>
      {person.name}&nbsp;{person.number}
    </div>
  );
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let pos = -1

    persons.forEach(function(item, index, array) {
      console.log(item, index)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
         {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
    </div>
  )

}

export default App
