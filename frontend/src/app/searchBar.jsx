import { useState } from "react";

function RadioSelector({ selection, setSelection }) {
	return (
		<div id="user-selector">
			<LabelSelect
				labelName={"Aluno"}
				labelState={"student"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Professor"}
				labelState={"teacher"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Assistente"}
				labelState={"assistant"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Todos"}
				labelState={"everyone"}
				selection={selection}
				setSelection={setSelection}
			/>
		</div>
	);
}

function LabelSelect({ labelName, labelState, selection, setSelection }) {
	return (
		<label className="radio">
			<input
				type="radio"
				checked={selection === labelState}
				onChange={() => setSelection(labelState)}
			/>
			<span className="name">{labelName}</span>
		</label>
	);
}

function SearchBar({ inputCallback, radioSelection, setRadioSelection }) {
	const [userInput, setUserInput] = useState("");

	const handleInputChange = (event) => {
		setUserInput(event.target.value);
	};

	const handleKeyPress = async (event) => {
		if (event.key === "Enter") {
			inputCallback(userInput);
		}
	};

	const handleSearchClick = async () => {
		inputCallback(userInput);
	};

	const handleClearClick = async () => {
		setUserInput("");
		inputCallback("");
	};

	return (
		<div id="searchBar">
			<RadioSelector
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

			<button type="button" className="clearBtn" onClick={handleClearClick}>
				<svg viewBox="0 0 384 512">
					<title>Limpar Pesquisa</title>
					<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
				</svg>
			</button>

			<button type="button" className="LupaBtn" onClick={handleSearchClick}>
				<svg viewBox="0 -0.24 28.423 28.423">
					<title> Pesquisar </title>
					<path
						className="lupa"
						d="M14.953,2.547A12.643,12.643,0,1,0,27.6,15.19,12.649,12.649,0,0,0,14.953,2.547Zm0,2A10.643,10.643,0,1,1,4.31,15.19,10.648,10.648,0,0,1,14.953,4.547Z"
						transform="translate(-2.31 -2.547)"
						fillRule="evenodd"
					/>
					<path
						className="lupa"
						d="M30.441,28.789l-6.276-6.276a1,1,0,1,0-1.414,1.414L29.027,30.2a1,1,0,1,0,1.414-1.414Z"
						transform="translate(-2.31 -2.547)"
						fillRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}

export default SearchBar;
