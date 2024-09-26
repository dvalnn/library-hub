import { useEffect, useState } from "react";
import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");

	return (
		<div id="App">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow searchArgs={{ name, filter }} />
		</div>
	);
}

export default App;
