import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import axios from 'axios'


axios
  .get('https://studies.cs.helsinki.fi/restcountries/')
  .then(response => {
    if (!response.data){
      console.log("No data Fetched")
    }
    else {
      ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    }
  })
  .catch(error => {
    console.error("Error: ", error)
  })
