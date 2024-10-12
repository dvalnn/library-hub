import { useState } from "react";

import AgentFilterRadio from "../Common/AgentFilterRadio.jsx";

function SearchBar({ inputCallback, radioSelection, setRadioSelection }) {
	const [userInput, setUserInput] = useState("");
	const [buttonMode, setButtonMode] = useState(1);

	const handleInputChange = (event) => {
		setUserInput(event.target.value);
		if (buttonMode === 2) {
			setButtonMode(1);
		}
	};

	const handleKeyPress = async (event) => {
		if (event.key === "Enter") {
			inputCallback(userInput);
			setButtonMode(2);
		}
	};

	const handleSearchClick = async () => {
		inputCallback(userInput);
		setButtonMode(2);
	};

	const handleClearClick = async () => {
		setUserInput("");
		inputCallback("");
		setButtonMode(1);
	};

	return (
		<div id="searchBar">
			<AgentFilterRadio
				selection={radioSelection}
				setSelection={setRadioSelection}
			/>
			<input
				type="text"
				className="input"
				value={userInput}
				onChange={handleInputChange}
				onKeyUp={handleKeyPress}
				placeholder="Pesquisar por nome"
			/>

			{buttonMode === 1 && (
				<button type="button" className="sBarBtn" onClick={handleSearchClick}>
					<svg viewBox="0 -0.24 28.423 28.423">
						<title> Pesquisar </title>
						<path
							d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z"
							transform="translate(-2.31 -2.547)"
							fillRule="evenodd"
						/>
						<path
							d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z"
							transform="translate(-2.31 -2.547)"
							fillRule="evenodd"
						/>
					</svg>
				</button>
			)}

			{buttonMode === 2 && (
				<button type="button" className="sBarBtn" onClick={handleClearClick}>
					<svg viewBox="0 0 384 512">
						<title>Limpar Pesquisa</title>
						<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
					</svg>
				</button>
			)}
		</div>
	);
}

export default SearchBar;
