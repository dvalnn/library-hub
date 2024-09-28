import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";

import { useEffect, useState } from "react";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

import useSelectionState from "./useSelectionState.js";
import useRecordsState from "./useRecordsState.js";

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");
	const [search, setSearch] = useState("everyone");
	const [last, setLast] = useState({ name, filter });
	const [selection, upsertFunc, removeFunc, checkFunc, resetFunc] =
		useSelectionState();
	const [records, createRecords] = useRecordsState();

	const createRecordsWrapper = () => {
		createRecords(selection);
	};

	if (name !== last.name || filter !== last.filter) {
		setLast({ name, filter });
		setSearch(true);
		resetFunc();
		console.log("Reset!");
	}

	console.log(`selection: ${JSON.stringify(selection)}`);

	return (
		<div id="App">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow
				searchArgs={{ name, filter, search, setSearch }}
				selection={selection}
				selectionFuncs={[upsertFunc, removeFunc, checkFunc]}
				submitFunc={createRecordsWrapper}
			/>
		</div>
	);
}

export default App;
