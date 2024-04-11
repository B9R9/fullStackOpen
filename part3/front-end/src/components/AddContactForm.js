import React from 'react'

const AddContactForm = ({newPerson, addContact, handleNameChange, handleNumberChange}) => {
	return (
	  <form onSubmit={addContact}>
		<div>
		  name:   <input value={newPerson.name} onChange={handleNameChange}/>
		  <br />
		  Number: <input value={newPerson.number} onChange={handleNumberChange}/>
		  </div>
		<div>
		<button type="submit">add</button>
		</div>
	  </form>
	)
  }

  export default AddContactForm