import React from "react";




const SearchCountry = ({ search, handleSearch}) => {
	return (
		<div>
			<input
				type="text"
				value={search}
				onChange={handleSearch}
				placeholder="Search for a country..." 
			/>
		</div>
	)
}

export default SearchCountry