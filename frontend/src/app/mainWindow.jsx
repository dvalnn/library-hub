import { useEffect, useState } from "react";

import performSearch from "./search.js";
import Agent from "./agent.jsx";

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

export default MainWindow;
