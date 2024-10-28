import { useEffect, useState } from "react";
import notfound from "../../../assets/images/not-found.png";
import Agent from "./Agent.jsx";
import performAgentSearch from "./performAgentSearch.js";

function AgentList({
	searchArgs,
	setShowSubmit,
	selectionFuncs,
	notifSetters,
}) {
	const [elements, setElements] = useState([]);

	// Use useEffect to handle search logic and prevent updates during render
	useEffect(() => {
		const { name, filter, search, setSearch } = searchArgs;
		const [success, warning, error] = notifSetters;

		// Only perform the search if the search flag is true
		if (!search) return;

		// Reset the search flag
		setSearch(false);

		// Perform the search and handle success or error
		performAgentSearch(name, filter)
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
	}, [searchArgs, notifSetters]);

	useEffect(() => {
		setShowSubmit(elements.length > 0); // Simplified logic
	}, [elements, setShowSubmit]);
	// Render no results if elements are empty
	if (!elements.length) {
		return (
			<div className="noResults">
				<img src={notfound} alt="Imagem nenhum item encontrado" />
				<h2>Sem resultados de pesquisa</h2>
			</div>
		);
	}

	// Render the results if there are any elements
	return (
		<div className="resultsContainer">
			{elements.map((agent, index) => (
				<Agent
					agent={agent}
					selectionFuncs={selectionFuncs}
					key={agent.ID || index}
				/>
			))}
		</div>
	);
}

export default AgentList;
