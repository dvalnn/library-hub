import { useState } from "react";

function RadioSelector({ selection, setSelection }) {
	return (
		<div id="user-selector">
			<LabelSelect labelName={"Aluno"} labelState={"student"} selection={selection} setSelection={setSelection}/>
			<LabelSelect labelName={"Professor"} labelState={"teacher"} selection={selection} setSelection={setSelection}/>
			<LabelSelect labelName={"Assistente"} labelState={"assistant"} selection={selection} setSelection={setSelection}/>
			<LabelSelect labelName={"Todos"} labelState={"everyone"} selection={selection} setSelection={setSelection}/>
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
	)
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

	const handleButtonClick = async () => {
		inputCallback(userInput);
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
				onChange={handleInputChange}
				onKeyUp={handleKeyPress}
				placeholder="Pesquisar por nome"
			/>
			<button type="button" className="LupaBtn" onClick={handleButtonClick}>
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
