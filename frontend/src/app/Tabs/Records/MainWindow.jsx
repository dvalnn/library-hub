import { useEffect, useState } from "react";

import SubmitButton from "../Common/SubmitButton.jsx";
import Notifications from "../Common/Notifications.jsx";
import useNotications from "../Common/useNotifications.js";

import AgentList from "./AgentList.jsx";
import RecordsList from "./RecordsList.jsx";

import useRecordsState from "./useRecordsState.js";
import useSelectionState from "./useSelectionState.js";

function MainWindow({ name, filter }) {
	const [showSubmit, setShowSubmit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [search, setSearch] = useState(false);

	const [eventText, setSuccess, setWarning, setError] = useNotications();
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
	};

	const [last, setLast] = useState({ name, filter });

	useEffect(() => {
		if (name !== last.name || filter !== last.filter) {
			setLast({ name, filter });
			setSearch(true);
			selectionReset();
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
					<SubmitButton
						btnId="RegBtn"
						btnText="Registar"
						handleClick={createRecordsWrapper}
					/>
				)}

				<Notifications eventText={eventText} eventSetters={eventSetters} />
			</div>

			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
				<RecordsList
					records={records}
					recordHandlers={{ markRecord, removeMark, checkMark }}
					setShowDelete={setShowDelete}
				/>
				{showDelete !== false && (
					<SubmitButton
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
