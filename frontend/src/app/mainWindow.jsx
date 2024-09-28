import { useEffect, useState } from "react";

import AgentList from "./agentList.jsx";
import RecordList from "./recordList.jsx";
import { SubmitBtn } from "./buttons.jsx";

import useSelectionState from "./js/useSelectionState.js";
import useRecordsState from "./js/useRecordsState.js";

//*MIGUEL:
//TODO: Tratar de toda a parte direita dos Registos
//TODO: Tratar de meter o dropdown a funcionar com bootstrap
function MainWindow({ name, filter, windowReset }) {
	const [showSubmit, setShowSubmit] = useState(false);
	const [search, setSearch] = useState(false);

	const [records, createRecords, deleteRecord] = useRecordsState();
	const [selection, upsertFunc, removeFunc, checkFunc, selectionReset] =
		useSelectionState();

	const createRecordsWrapper = () => {
		createRecords(selection);
		selectionReset();
		windowReset();
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
			selectionReset();
			console.log("Reset!");
		}
	}, [name, filter, last, selectionReset]);

	return (
		<div id="mainWindow">
			<div id="leftWindow" className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList
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
				<RecordList records={records} />
			</div>
		</div>
	);
}

export default MainWindow;
