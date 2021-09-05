import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <>
      <p>{person.name}</p>
    </>
  );
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let pos = -1

    persons.forEach(function(item, index, array) {
      console.log(item, index)
      if (item.name === newName) {
        pos = index
      }
    })
    console.log(newName, pos)
    if (pos >= 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
      }
   
      setPersons(persons.concat(personObject))
      setNewName('')
    }
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
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
