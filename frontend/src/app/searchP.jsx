import { useState } from "react";
import "./searchP.css";
import { SearchAgent } from "../../wailsjs/go/app/App";

//* RadioSelector's Hook
function useSelectedUserType() {
	const [selectedUserType, setSelectedUserType] = useState(null);
	return { selectedUserType, setSelectedUserType };
}

//*SearchBar's Hook
function useSearchInfo() {
	const [searchedInfo, setInfo] = useState("");
	const [results, setResults] = useState(null);  // Add a state for search results

	const setSearchedInfo = (info) => {
		console.log(`Updating search info to ${info}`);
		setInfo(info);
	};

	const performSearch = async (query) => {
		// Return early if the search query is empty
		if (!query) {
			console.log("empty search");
			setResults([]); // Clear results if the search is empty
			return;
		}

		console.log(`Performing search for: ${query}`);

		try {
			// Wait for the search results to resolve
			const matches = await SearchAgent(query, 0);
			console.log(`matches: ${JSON.stringify(matches)}`);
			setResults(matches);  // Update the results state with matches
			return matches;  // Return the matches if needed elsewhere
		} catch (error) {
			console.error("Error performing search:", error);
			setResults([]); // Optionally clear results on error
			return []; // Return empty array in case of error
		}
	};

	return { searchedInfo, setSearchedInfo, performSearch, results };
}

//* Father Div
function SearchSection() {
	return (
		<form id="searchForm">
			<SearchBar />
		</form>
	);
}

//*Child Div SearchBar
function SearchBar() {
	const { searchedInfo, setSearchedInfo, performSearch, results } = useSearchInfo();

	const handleInputChange = (event) => {
		setSearchedInfo(event.target.value);
	};

	const handleKeyPress = async (event) => {
		if (event.key === 'Enter') {
			await performSearch(searchedInfo);  // Call search on Enter key press
		}
	};

	const handleButtonClick = async () => {
		await performSearch(searchedInfo);  // Call search on button click
	};

	return (
		<div id="searchBar">
			<RadioSelector />
			<input
				type="text"
				className="input"
				value={searchedInfo}
				onChange={handleInputChange}
				onKeyUp={handleKeyPress}
				placeholder="Pesquisar por nome"
			/>
			<button type="button" className="LupaBtn" onClick={handleButtonClick}>
				<svg viewBox="0 -0.24 28.423 28.423">
					<path id="glass" d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z" transform="translate(-2.31 -2.547)" fillRule="evenodd" />
					<path id="handle" stroke="#818df8" fill="#818df8" d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z" transform="translate(-2.31 -2.547)" fillRule="evenodd" />
				</svg>
			</button>
		</div>
	);
}

//*Child Div RadioSelector
function RadioSelector() {
	const { selectedUserType, setSelectedUserType } = useSelectedUserType();
	return (
		<div id="user-selector">
			<label className="radio">
				<input
					type="radio"
					value="1"
					checked={selectedUserType === "student"}
					onChange={() => setSelectedUserType("student")}
				/>
				<span className="name">Aluno</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					value="2"
					checked={selectedUserType === "professor"}
					onChange={() => setSelectedUserType("professor")}
				/>
				<span className="name">Professor</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					value="3"
					checked={selectedUserType === "assistent"}
					onChange={() => setSelectedUserType("assistent")}
				/>
				<span className="name">Assistente</span>
			</label>
			<label className="radio">
				<input
					type="radio"
					value="4"
					checked={selectedUserType === "everyone"}
					onChange={() => setSelectedUserType("everyone")}
				/>
				<span className="name">Todos</span>
			</label>
		</div>
	);
}

export { SearchSection, useSelectedUserType, useSearchInfo };
