import React from "react";

const DisplayDetails = ({ country }) => {
	
	const languages = []
	for (let key in country.languages){
		if (country.languages.hasOwnProperty(key)) {
			languages.push(country.languages[key])
		}
	}

	let description = `Flag of ${country.name.common}`
	
	  return (
		<tr>
			<td>
				<ul>
					<li>Capital: {country.capital}</li>
					<li>Population: {country.population}</li>
					<li>Area: {country.area}</li>
				</ul>
				<h4>Languages:</h4>
				<ul>
					{languages.map(langue => <li key={langue}>{langue}</li>)}
				</ul>
				<h4>Flags</h4>
				<img alt={description} title={description} src={country.flags.png}/>
		  	</td>
		</tr>
	  )
	}

export default DisplayDetails