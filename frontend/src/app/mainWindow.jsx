import { useEffect, useState } from "react";

import AgentList from "./agentList.jsx";
import AlertEvents from "./alert.jsx";
import { SubmitBtn } from "./buttons.jsx";
import RecordList from "./recordList.jsx";

import useEvents from "./js/useEvents.js";
import useRecordsState from "./js/useRecordsState.js";
import useSelectionState from "./js/useSelectionState.js";

//*MIGUEL:
//TODO: Error and Success notifications
//TODO: Implementar TABs
//TODO: Fades de Scroll

//TODO: Fazer um calendário para selecionar os dias
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Implementar os Loads comentados dentro do agentList e recordList
function MainWindow({ name, filter, windowReset }) {
	const [showSubmit, setShowSubmit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [search, setSearch] = useState(false);

	const [eventText, setSuccess, setWarning, setError] = useEvents();
	const eventSetters = [setSuccess, setWarning, setError];

	const [
		records,
		createRecords,
		markRecord,
		removeMark,
		checkMark,
		deleteMarked,
	] = useRecordsState(eventSetters);

	const [selection, upsertFunc, removeFunc, checkFunc, selectionReset] =
		useSelectionState();

	const createRecordsWrapper = () => {
		createRecords(selection);
		selectionReset();
		windowReset();
	};

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
					eventSetters={eventSetters}
				/>
				{showSubmit !== false && (
					<SubmitBtn
						btnId="RegBtn"
						btnText="Registar"
						handleClick={createRecordsWrapper}
					/>
				)}

				<AlertEvents eventText={eventText} eventSetters={eventSetters} />
			</div>

			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
				<RecordList
					records={records}
					recordHandlers={{ markRecord, removeMark, checkMark }}
					setShowDelete={setShowDelete}
				/>
				{showDelete !== false && (
					<SubmitBtn
						btnId="DelBtn"
						btnText="Eliminar"
						handleClick={deleteMarked}
					/>
				)}
			</div>
		</div>
	);
}

export default MainWindow;
