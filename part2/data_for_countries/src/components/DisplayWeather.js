import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'

import DisplayError from "./DisplayError";


const DisplayWeather = ({ country }) => {
	const [errorMessage, setError] = useState(null)
	const [weather, setWeather] = useState({})

	const baseUrl = "https://api.open-meteo.com"
	const endPoint = "/v1/forecast?"
	let position = `latitude=${country.latlng[0]}&longitude=${country.latlng[1]}`
	const param = "&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m"


	const hook = () => {
		axios
			.get(`${baseUrl}${endPoint}${position}${param}`)
			.then(response => {
				if (!response.data){
					console.log ("Error: No data fetch from weather API")
				}
				else {
					setWeather(response.data)
				}
			})
			.catch(error => {
				setError(
					`Error: can not setWeather: ${error}`
				)
				setTimeout(() => {
					setError(null)
				}, 5000)
			})
	}
	useEffect(hook,[country.capital, position])

	
	return (
		<tr>
			<td>
				<h3>Weather in {country.capital}</h3>
				{weather.current &&
				<ul>
					<li>Temperature: {weather.current.temperature_2m}</li>
					<li>Feeling: {weather.current.apparent_temperature}</li>
					<li>Wind: {weather.current.wind_speed_10m}</li>
					<li>is day: {weather.current.is_day ? 'day' : 'night'} </li>
					<li>weather code: {weather.current.weather_code}</li>
				</ul>}
				<DisplayError message={errorMessage} />
			</td>
		</tr>
	)
}

export default DisplayWeather