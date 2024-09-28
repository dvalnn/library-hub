import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";

import { useState } from "react";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");

	const searchReset = () => {
		setName("");
		setFilter("everyone");
	};

	return (
		<div id="App">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow name={name} filter={filter} windowReset={searchReset} />
		</div>
	);
}

export default App;
