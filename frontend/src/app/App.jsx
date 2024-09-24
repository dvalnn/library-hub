import { useEffect, useState } from "react";
import "./css/mainWindow.css";
import "./css/searchBar.css";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

const ExampleAgents = [
	{
		name: "Vitor Nozelo",
		kind: 1,
		class: "8B",
	},
	{
		name: "Paulo Binho",
		kind: 2,
	},
	{
		name: "Manel Bezouro",
		kind: 3,
	},
];

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
