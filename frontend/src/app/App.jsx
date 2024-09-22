import { useEffect, useState } from "react";
import "./css/window.css";
import "./css/searchP.css";

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
	const agent = ExampleAgents[0];
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("");

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
