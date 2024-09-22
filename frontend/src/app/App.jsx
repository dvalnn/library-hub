import { useEffect, useState } from "react";
import "./css/window.css";
import "./css/searchP.css";

import Agent from "./agent.jsx";
import SearchBar from "./searchBar.jsx";
import performSearch from "./search.js";

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

function MainWindow({ searchArgs }) {
	return (
		<div id="mainWindow">
			<div className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList searchArgs={searchArgs} />
			</div>
			<div className="resultWindow">
				<h1 className="title">Registos</h1>
			</div>
		</div>
	);
}

function AgentList({ searchArgs }) {
	const [elements, setElements] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setElements([]);
		performSearch(searchArgs.name, searchArgs.filter)
			.then((res) => {
				console.log(`results: ${res}`);
				setElements(res);
			})
			.catch((err) => {
				console.error(`error: ${err}`);
			})
			.finally(() => {
				console.log("promise resolved");
			});
	}, [searchArgs.name, searchArgs.filter]);

	if (elements.length === 0) {
		return (
			<ul className="resultsContainer">
				<li>Sem resultados de pesquisa</li>
			</ul>
		);
	}

	return (
		<ul className="resultsContainer">
			{elements.map((agent, index) => (
				<Agent agent={agent} key={agent.id || index} />
			))}
		</ul>
	);
}

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
