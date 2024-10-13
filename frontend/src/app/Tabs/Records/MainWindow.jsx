import { useCallback, useEffect, useState } from "react";
import SubmitButton from "../Common/SubmitButton.jsx";
import AgentList from "./AgentList.jsx";
import RecordsList from "./RecordsList.jsx";
import useSelectionState from "./useSelectionState.js";

function MainWindow({ name, filter, recordsState, notifSetters }) {
	// Record state destructuring
	const [
		records,
		createRecords,
		markRecord,
		removeMark,
		checkMark,
		deleteMarked,
	] = recordsState;

	// Selection state from custom hook
	const [selection, upsertFunc, removeFunc, checkFunc, selectionReset] =
		useSelectionState();

	// Local UI state
	const [showSubmit, setShowSubmit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [search, setSearch] = useState(false);

	// Handle record creation and reset selection
	const createRecordsWrapper = useCallback(() => {
		createRecords(selection);
		selectionReset();
	}, [createRecords, selection, selectionReset]);

	// Handle changes in name or filter props
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
			{/* Left side: Agent search and submission */}
			<div id="leftWindow" className="resultWindow">
				<h1 className="title">Resultados da Pesquisa</h1>
				<AgentList
					setShowSubmit={setShowSubmit}
					selectionFuncs={[upsertFunc, removeFunc, checkFunc]}
					searchArgs={{ name, filter, search, setSearch }}
					notifSetters={notifSetters}
				/>
				{showSubmit && (
					<SubmitButton
						btnId="RegBtn"
						btnText="Registar"
						handleClick={createRecordsWrapper}
					/>
				)}
			</div>

			{/* Right side: Record list and deletion */}
			<div id="rightWindow" className="resultWindow">
				<h1 className="title">Registos</h1>
				<RecordsList
					records={records}
					recordHandlers={{ markRecord, removeMark, checkMark }}
					setShowDelete={setShowDelete}
				/>
				{showDelete && (
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
