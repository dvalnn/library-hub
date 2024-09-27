import { useEffect, useState } from "react";


import AgentList from "./agentList.jsx";
import { SubmitBtn } from "./buttons.jsx";


//*MIGUEL:
//TODO: Tratar de toda a parte direita dos Registos
//TODO: Tratar de meter o dropdown a funcionar com bootstrap

//*TIAGO:
//TODO: Meter botões a trabalhar -> Selecionar (botão plus) + clicar submeter => enviar agent para RegistList

function MainWindow({ searchArgs, selectionFuncs }) {
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
					<SubmitBtn BtnId={"RegBtn"} BtnTxt="Registar" />
				)}
			</div>
			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
				{/* <RegistList agent={agent} btnType={2} /> */}
			</div>
		</div>
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
