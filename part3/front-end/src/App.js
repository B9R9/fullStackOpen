import React from 'react'
import { useState, useEffect } from 'react'

import phonebookServices from './services/phonebook' 
import Filter from './components/Filter'
import DisplayPersons from './components/DisplayPersons'
import AddContactForm from './components/AddContactForm'
import Error from './components/ErrorMessage'
import Notifications from './components/Notifications'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    phonebookServices
    .getAll()
    .then(initialState => {
      const updatePerson = initialState.map(person => {
        return {...person, id: person.id.toString()}
      })
      setPersons(updatePerson)
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)}, 5000)
    })
  }

  useEffect(hook, [])

  const updateNumber = (actuelContact, updateContact) => {
    if (window.confirm(`${actuelContact.name} is already added to the phonebook, replace the old number with a new one?`)){
      const modifiedContact = {...actuelContact, number: updateContact.number}
      phonebookServices
      .update(actuelContact.id, modifiedContact)
      .then(updatedContact =>{
        setPersons(persons.map(person => person.id === actuelContact.id ? updatedContact : person))
        setMessage(
          `${actuelContact.name} has been updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewPerson({
          name: '',
          number: '',
        })
      })
      .catch(error => {
        setErrorMessage (error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  } 
  
  const addContact = (event) => {
    event.preventDefault()
    
    const isPresent = persons.find(person => person.name === newPerson.name)
    if (isPresent){
      updateNumber(isPresent, newPerson)
    }
    else {
      if (newPerson.name === '' || newPerson.number === ''){
        setErrorMessage(
          `Some informations are missing`
        )
        setTimeout(() => {
          setErrorMessage(null)}, 5000)
      }
      else {
        const newContactObject = {...newPerson}

        phonebookServices
        .create(newContactObject)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setMessage(
            `${newContact.name} has been added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewPerson({
            name: '',
            number: '',
          })
        })
        .catch(error => {
          console.log("in front addcontact: ", error.response.data.error)
          setErrorMessage(error.response.data)
          setTimeout(() => {
            setErrorMessage(null)}, 5000)
          setNewPerson({
              name: '',
              number: '',
            })
        })
      }
    }
  }

  const removeContact = (id) => {
    const contactToRemove = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${contactToRemove.name}`)){
        phonebookServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(
            `${contactToRemove.name} has been removed`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }) 
    }
  }
  
  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value })
  }

  const handleNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

    // Filtrez les personnes à afficher en fonction du filtre
  const personsToShow = persons.filter(person =>
      person.name.toLowerCase().startsWith(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Error message={errorMessage}/>

      <h3>Looking for Somebody</h3>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>New Contact</h3>
      <AddContactForm 
      newPerson={newPerson} 
      addContact={addContact} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}/>

      <Notifications message={message}/>

      <h2>Numbers</h2>
      <DisplayPersons persons={personsToShow} removeContact={removeContact}/>
    </div>
  )
}

export default App