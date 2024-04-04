import React, { useEffect, useState } from "react";

import ShowMore from "./ShowMore";
import DisplayDetails from "./DisplayDetails";
import DisplayWeather from "./DisplayWeather";

const DisplayCountry = ({ allCountries, search }) => {

	const [showDetails, setShowDetails] = useState(null)
	const handleDetails = (country) => {
		if (showDetails && showDetails.name.common === country.name.common) {
			setShowDetails([])
		}
		else {
			setShowDetails(country)
		}
	}
	const [viewTotal, setViewTotal] = useState(false)
	const handleViewTotal = () => {
		setViewTotal(!viewTotal);
	  }
	
	const hook = () => {
		setViewTotal(false)
		setShowDetails(null)
	}
	useEffect(hook, [search])

	let countriesToShow = []
	countriesToShow = allCountries.filter(country => (
		country.name.common.toLowerCase().startsWith(search.toLowerCase())))
	
	if (search === '' || countriesToShow.length > 9){
		return (
			<div>
				<p>Too many matches, Specify another filter </p>
			</div>
		)		
	}

	if (countriesToShow.length === 0) {
		return (
			<div>
				<p>There is no match</p>
			</div>
		)
	}

	if (countriesToShow.length === 1 || viewTotal) {
		let country = (viewTotal ? showDetails : countriesToShow[0])
		return (
			<table>
				<tbody>
					<tr>
						<td>
							<h3>{country.name.common}</h3>
						</td>
					</tr>
					<DisplayDetails country={country} />
					<DisplayWeather country={country} />
					{countriesToShow.length > 1 && (
						<tr><td><button onClick={handleViewTotal}>View less</button></td></tr>
					)}
				</tbody>
			</table>
		)
	}

	return (
		<table>
			<tbody>
			{countriesToShow.map(country => (
				<React.Fragment key={country.cca3}>
				<tr>
					{showDetails && showDetails.name.common === country.name.common ? <td><h4>{country.name.common}</h4></td> : <td>{country.name.common}</td>}
					<td><ShowMore handleDetails={() => handleDetails(country)} isShowing={showDetails && showDetails.name.common === country.name.common}/></td>
				</tr>
				{showDetails && showDetails.name.common === country.name.common && (
					<>
					<DisplayDetails country={country}/>
					<tr><td><button onClick={handleViewTotal}>View More</button></td></tr>
					</>
				)}
				</React.Fragment>
			))}
			</tbody>
		</table>
	)
}

export default DisplayCountry