import React from 'react'
import ReactDOM from 'react-dom/client'

import axios from 'axios'

import App from './App'

axios
.get('/api/persons')
.then(response => {
	if (!response.data){
		console.log("No data received")
	}
	else {
		ReactDOM.createRoot(document.getElementById('root')).render(<App />)
	}
})
.catch(error => {
	console.error("ERROR: ", error)
})
