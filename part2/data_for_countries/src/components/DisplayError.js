import React from "react";

const DisplayError = ({ message }) => {
	if (!message) {
		return null
	}
	else {
		return (
			<div>
				<p>{message}</p>
			</div>
		)
	}
}

export default DisplayError