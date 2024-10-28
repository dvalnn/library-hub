import { useState } from "react";

import SearchBar from "./SearchBar.jsx";
import MainWindow from "./MainWindow.jsx";


function RecordsTab({ recordsState, notifSetters}) {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");
	const allAgentOptions = [
		{ labelName: "Aluno", labelState: "student" },
		{ labelName: "Professor", labelState: "teacher" },
		{ labelName: "Assistente", labelState: "assistant" },
		{ labelName: "Todos", labelState: "everyone" },
	  ];

	return (
		<div className="tab" id="recordsTab">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
				agentOptions={allAgentOptions}
			/>
			<MainWindow
				name={name}
				filter={filter}
				recordsState={recordsState}
				notifSetters={notifSetters}
			/>
		</div>
	);
}

export default RecordsTab;
