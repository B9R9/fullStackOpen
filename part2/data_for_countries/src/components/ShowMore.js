import React from "react";


const ShowMore = ({ handleDetails, isShowing }) => {
	return <button onClick={handleDetails}>{isShowing ? 'Less' : 'More'}</button>
}

export default ShowMore