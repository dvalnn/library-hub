import { useEffect, useState } from "react";
import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

function useSelectionState() {
	const [selection, setSelection] = useState([]);

	const appendToSelection = (itemToAppend) => {
		console.log(`appending: ${itemToAppend}`);
		setSelection([...selection, itemToAppend]);
	};

	const removeFromSelection = (itemToRemove) => {
		console.log(`removing: ${itemToRemove}`);
		const updatedSelection = selection.filter((item) => item !== itemToRemove);
		setSelection(updatedSelection);
	};

	const checkSelection = (itemToFind) => {
		return selection.includes(itemToFind);
	};

	const clearSelection = () => {
		setSelection([]);
	};

	return [
		selection,
		appendToSelection,
		removeFromSelection,
		checkSelection,
		clearSelection,
	];
}

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");
	const [search, setSearch] = useState("everyone");
	const [last, setLast] = useState({ name, filter });
	const [selection, appendFunc, removeFunc, checkFunc, resetFunc] =
		useSelectionState();

	if (name !== last.name || filter !== last.filter) {
		setLast({ name, filter });
		setSearch(true);
		resetFunc();
		console.log("Reset!");
	}

	console.log(`selection: ${selection}`);

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
				selectionFuncs={[appendFunc, removeFunc, checkFunc]}
			/>
		</div>
	);
}

export default App;
