import { useEffect, useState } from "react";

import notfound from "../assets/images/not-found.png";

import performSearch from "./js/search.js";

import Agent from "./agent.jsx";

function AgentList({
	searchArgs,
	setShowSubmit,
	selectionFuncs,
	eventSetters,
}) {
	const [elements, setElements] = useState([]);
	useEffect(() => {
		const { name, filter, search, setSearch } = searchArgs;
		const [success, warning, error] = eventSetters;
		if (!search) return;
		setSearch(false);
		performSearch(name, filter)
			.then((res) => {
				setElements(res);
                //TODO: remove this from final ver
				if (res.length) {
					success(`Encontrados ${res.length} resultados`);
				}
			})
			.catch((err) => {
				console.error(`error: ${err}`);
				error(err);
			});
	}, [searchArgs, eventSetters]);

	if (!elements.length) {
		setShowSubmit(false);
		return (
			<ul className="noResults">
				<img src={notfound} alt="Imagem nenhum item encontrado" />
				<li>Sem resultados de pesquisa</li>
			</ul>
		);
	}

	setShowSubmit(true);
	return (
		<ul className="resultsContainer">
			{/* <div class="loader" /> */}
			{elements.map((agent, index) => (
				<Agent
					agent={agent}
					selectionFuncs={selectionFuncs}
					key={agent.ID || index}
				/>
			))}
		</ul>
	);
}

export default AgentList;
