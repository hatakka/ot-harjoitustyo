import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterNumbers, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
   }, [])

  console.log('render', persons.length, 'persons')

  const filterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)

    if (person != null) {
      const id = person.id
      if (window.confirm(`${person.name} is already added to phonebook. Replace the old number with the new one?`)) {
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
          })
          .catch(error => {
            alert(
              `the person '${person.name}' was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (name) => {
    const person = persons.find(n => n.name === name)
    const id = person.id

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
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
        <Filter key="filter" filterNumbers={filterNumbers} filterChange={filterChange} />
      <h2>add a new</h2>
        <PersonForm key="personForm" 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons key="persons" persons={persons} filterNumbers={filterNumbers} 
            removePerson={removePerson} />
    </div>
  )

}

export default App
