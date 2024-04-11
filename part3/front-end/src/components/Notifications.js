import React from "react"

const Notifications = ({ message }) => {
	const notificationsStyle = {
		color: 'green',
		width: 'auto',
		fontStyle: 'italic',
		fontSize: 35,
		border: '3px solid green',
		padding: '10px 10px 10px 10px',
		margin: '10px 0 0 0'
	  }	
	if (message === null) {
		return null
	}

	return (
		<div className='notification' style={notificationsStyle}>
			{message}
		</div>
	)
}

export default Notifications