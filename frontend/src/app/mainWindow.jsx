import { useEffect, useState } from "react";

import AgentList from "./agentList.jsx";
import { SubmitBtn } from "./buttons.jsx";

import useSelectionState from "./useSelectionState.js";
import useRecordsState from "./useRecordsState.js";

//*MIGUEL:
//TODO: Tratar de toda a parte direita dos Registos
//TODO: Tratar de meter o dropdown a funcionar com bootstrap
function MainWindow({ name, filter }) {
	const [showSubmit, setShowSubmit] = useState(false);
	const [search, setSearch] = useState(false);

	const [records, createRecords, deleteRecord] = useRecordsState();
	const [selection, upsertFunc, removeFunc, checkFunc, resetFunc] =
		useSelectionState();

	const createRecordsWrapper = () => {
		createRecords(selection);
	};

	useEffect(() => {
		console.log(`selection: ${JSON.stringify(selection)}`);
	}, [selection]);

	useEffect(() => {
		console.log(`records: ${JSON.stringify(records)}`);
	}, [records]);

	const [last, setLast] = useState({ name, filter });

	useEffect(() => {
		if (name !== last.name || filter !== last.filter) {
			setLast({ name, filter });
			setSearch(true);
			resetFunc();
			console.log("Reset!");
		}
	}, [name, filter, last, resetFunc]);

	return (
		<div id="mainWindow">
			<div id="leftWindow" className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList
					btnType={1}
					setShowSubmit={setShowSubmit}
					selectionFuncs={[upsertFunc, removeFunc, checkFunc]}
					searchArgs={{ name, filter, search, setSearch }}
				/>
				{showSubmit !== false && (
					<SubmitBtn
						btnId="RegBtn"
						btnText="Registar"
						handleClick={createRecordsWrapper}
					/>
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
