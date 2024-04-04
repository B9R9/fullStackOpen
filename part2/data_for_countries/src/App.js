import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

import SearchCountry from './components/SearchCountry'
import DisplayCountry from './components/DisplayCountry'
import DisplayError from './components/DisplayError'

const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [errorMessage, setError] = useState(null)
  const [search, setSearch] = useState('')

  const hook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        if (!response.data) {
          console.log ("No data fetch")
        }
        else {
          setAllCountries(response.data)
        }
      })
      .catch(error => {
        setError(
          `Error: can not setAllCountries: ${error}`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => setSearch(event.target.value)

  return (
    <div>
      <SearchCountry search={search} handleSearch={handleSearch} />
      <DisplayError message={errorMessage} />
      <DisplayCountry allCountries={allCountries} search={search}/>
    </div>
  )
}

export default App;
