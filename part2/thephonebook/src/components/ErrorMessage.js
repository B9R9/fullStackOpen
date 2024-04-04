import React from "react"

const Error = ({ message }) => {
	const errorStyle = {
		color: 'red',
		width: 'auto',
		fontStyle: 'italic',
		fontSize: 35,
		border: '3px solid red',
		padding: '10px 10px 10px 10px',
		margin: '10px 0 0 0'
	  }	
	if (message === null) {
		return null
	}

	return (
		<div className='error' style={errorStyle}>
			{message}
		</div>
	)
}

export default Error