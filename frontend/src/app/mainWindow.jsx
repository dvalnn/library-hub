import { useEffect, useState } from "react";

import performSearch from "./search.js";
import Agent from "./agent.jsx";

//TODO: Fazer Scroll window em .resultsContainer
//TODO: Tratar de toda a parte direita dos Registos
//TODO: Arranjar botão submit!  
//TODO: 	1. meté-lo a aparecer apenas quando há resultados de pesquisa
//TODO: 	Hook para AgentsList para sacar a element.lenght != mostro <SubmitBtn/>


function MainWindow({ searchArgs }) {
	return (
		<div id="mainWindow">
			<div id="leftWindow" className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList searchArgs={searchArgs} btnType={1} />
				<SubmitBtn SubmtDelete={1} />
			</div>
			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
			</div>
		</div>
	);
}

function SubmitBtn({ SubmtDelete }) {
	if (SubmtDelete === 1) {
		return (
			<button className="submit" id="RegBtn">
				<svg viewBox="0 0 24 24" className="arr-2">
					<path
						d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
					></path>
				</svg>
				<span className="text">Registar</span>
				<span className="circle"></span>
				<svg viewBox="0 0 24 24" className="arr-1">
					<path
						d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
					></path>
				</svg>
			</button>
		)
	}
	return (
		<button className="submit" id="DeleteBtn">
			<svg viewBox="0 0 24 24" className="arr-2">
				<path
					d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
				></path>
			</svg>
			<span className="text">Registar</span>
			<span className="circle"></span>
			<svg viewBox="0 0 24 24" className="arr-1">
				<path
					d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
				></path>
			</svg>
		</button>
	)
}


function AgentList({ searchArgs, btnType }) {
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
			<ul id="NoResults">
				<img src="../assets/images/not-found.png" alt="Imagem nenhum item encontrado" />
				<li>Sem resultados de pesquisa</li>
			</ul>
		);
	}

	return (
		<ul className="resultsContainer">
			{elements.map((agent, index) => (
				<Agent agent={agent} key={agent.id || index} btnType={btnType} />
			))}
		</ul>
	);
}

export default MainWindow;
