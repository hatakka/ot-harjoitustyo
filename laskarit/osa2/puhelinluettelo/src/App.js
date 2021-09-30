import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterNumbers, setFilter] = useState('')
  const [messageToShow, setMessageToShow] = useState(null)

  let notification = null

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

      notification = {
        level: 'info',
        message: `The number of '${person.name}' has been replaced`
      }

      if (window.confirm(`'${person.name}' is already added to phonebook. Replace the old number with the new one?`)) {
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(id, changedPerson)
          .then(response => {
            const newMap = persons.map(p => p.id !== id ? p : response)
            setPersons(newMap)
            setMessage(notification)
            setNewName('')
            setNewNumber('')  
          })
          .catch(error => {
            notification = {
              level: 'error',
              message: `The person '${person.name}' was already deleted from server`
            }
            setPersons(persons.filter(p => p.id !== id))
            setMessage(notification)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      notification = {
        level: 'info',
        message: `Added ${personObject.name}`
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(notification)
          setNewName('')
          setNewNumber('')
       })
       .catch(error => {
          console.log(error)
          notification = {
            level: 'error',
            message: `Unable to add a new person: '${error.response.data.error}'`
          }
          setMessage(notification)
        })
      }
  }

  const removePerson = (person) => {

    const id = person.id
    notification = {
      level: 'info',
      message: `'${person.name}' removed`
    }

    if (window.confirm(`Delete '${person.name}?'`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          setMessage(notification)
        })
        .catch(error => {
          notification = {
            level: 'error',
            message: `The person '${person.name}' was already deleted from server`
          }
         setPersons(persons.filter(n => n.id !== id))
         setMessage(notification)
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

  const setMessage = (props) => {
    console.log(props)
    setMessageToShow(props)

    setTimeout(() => {
      setMessageToShow(null)
    }, 5000)
  }

  console.log(filterNumbers)
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={messageToShow} />
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
