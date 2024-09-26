import { useEffect, useState } from "react";

import notfound from "../assets/images/not-found.png";
import Agent from "./agent.jsx";
import performSearch from "./search.js";

//*MIGUEL:
//TODO: Tratar de toda a parte direita dos Registos
//TODO: Tratar de meter o dropdown a funcionar com bootstrap
//TODO: Meter fontes fixes no títulos e etc..

//*TIAGO:
//TODO: Meter botões a trabalhar -> Selecionar (botão plus) + clicar submeter => enviar agent para RegistList

function MainWindow({ searchArgs }) {
	const [showSubmit, setShowSubmit] = useState(false);

	return (
		<div id="mainWindow">
			<div id="leftWindow" className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList
					searchArgs={searchArgs}
					btnType={1}
					setShowSubmit={setShowSubmit}
					selectionFuncs={selectionFuncs}
				/>
				{showSubmit !== false && (
					<WindowBtn BtnId={"RegBtn"} BtnTxt="Registar" />
				)}
			</div>
			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
				{/* <RegistList agent={agent} btnType={2} /> */}
			</div>
		</div>
	);
}

//TODO: rever títulos dos svgs
//TODO: Adicionar button type
function WindowBtn({ BtnId, BtnTxt }) {
	return (
		<button type="button" className="submit" id={BtnId}>
			<svg viewBox="0 0 24 24" className="arr-2">
				<title>submeter</title>
				<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
			</svg>
			<span className="text">{BtnTxt}</span>
			<span className="circle" />
			<svg viewBox="0 0 24 24" className="arr-1">
				<title>placeholder</title>
				<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
			</svg>
		</button>
	);
}

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

//TODO: Tiago mete a função a receber o agent, em principio deve aparecer uma window do lado direito
function RegistList({ agent, btnType }) {
	return (
		<ul className="resultsContainer">
			<Agent agent={agent} key={agent.id || index} btnType={btnType} />
		</ul>
	);
}

export default MainWindow;
