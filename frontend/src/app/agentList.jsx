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

	// Use useEffect to handle search logic and prevent updates during render
	useEffect(() => {
		const { name, filter, search, setSearch } = searchArgs;
		const [success, warning, error] = eventSetters;

		// Only perform the search if the search flag is true
		if (!search) return;

		// Reset the search flag
		setSearch(false);

		// Perform the search and handle success or error
		performSearch(name, filter)
			.then((res) => {
				setElements(res);

				// Show success message if there are results
				if (res.length) {
					success(`Encontrados ${res.length} resultados`);
				}
			})
			.catch((err) => {
				console.error(`error: ${err}`);
				error(err); // Show error message
			});
	}, [searchArgs, eventSetters]);

	// Use another useEffect to control setShowSubmit based on elements length
	useEffect(() => {
		// Toggle the submit button visibility based on whether there are results
		if (elements.length === 0) {
			setShowSubmit(false);
		} else {
			setShowSubmit(true);
		}
	}, [elements, setShowSubmit]);

	// Render no results if elements are empty
	if (!elements.length) {
		return (
			<ul className="noResults">
				<img src={notfound} alt="Imagem nenhum item encontrado" />
				<li>Sem resultados de pesquisa</li>
			</ul>
		);
	}

	// Render the results if there are any elements
	return (
		<ul className="resultsContainer">
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
