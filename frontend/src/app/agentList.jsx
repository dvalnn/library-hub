import { useEffect, useState } from "react";

import notfound from "../assets/images/not-found.png";

import performSearch from "./search.js";

import Agent from "./agent.jsx";

function AgentList({ searchArgs, btnType, setShowSubmit, selectionFuncs }) {
	const [elements, setElements] = useState([]);
	const [error, setError] = useState(null); //TODO: make this work

	useEffect(() => {
		const { name, filter, search, setSearch } = searchArgs;
		if (!search) return;
		setSearch(false);
		performSearch(name, filter)
			.then((res) => {
				setElements(res);
			})
			.catch((err) => {
				console.error(`error: ${err}`);
				// TODO: display error
			});
	}, [searchArgs]);

	if (elements.length === 0) {
		setShowSubmit(false);
		return (
			<ul id="NoResults">
				<img src={notfound} alt="Imagem nenhum item encontrado" />
				<li>Sem resultados de pesquisa</li>
			</ul>
		);
	}

	setShowSubmit(true);
	return (
		<ul className="resultsContainer">
			{elements.map((agent, index) => (
				<Agent
					agent={agent}
					selectionFuncs={selectionFuncs}
					btnType={btnType}
					key={agent.id || index}
				/>
			))}
		</ul>
	);
}

export default AgentList;
