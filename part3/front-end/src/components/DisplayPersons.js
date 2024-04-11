import React from 'react'


const TableHead = () => {
	return (
		<thead>
		<tr>
		  <th>Name</th>
		  <th>Number</th>
		</tr>
	  </thead>
	)
}

const TableBody = ({persons, removeContact}) => {
	return (
		<tbody>
			{persons.map(person => (
				<tr key={person.id}>
				<td>{person.name}</td>
				<td>{person.number}</td>
				<td><button onClick={() => removeContact(person.id)}>delete</button></td>
				</tr>
			))}
		</tbody>
	)
}


const DisplayPersons = ({persons, removeContact}) => {
	return (
		<table>
		<TableHead />
		<TableBody  persons={persons} removeContact={removeContact}/>
		</table>
	)
  }

export default DisplayPersons