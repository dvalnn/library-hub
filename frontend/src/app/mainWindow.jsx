import { useEffect, useState } from "react";

import AgentList from "./agentList.jsx";
import RecordList from "./recordList.jsx";
import { SubmitBtn } from "./buttons.jsx";

import useSelectionState from "./js/useSelectionState.js";
import useRecordsState from "./js/useRecordsState.js";

//*MIGUEL:
//TODO: Error and Success notifications
//TODO: Fazer um calendário para selecionar os dias
//TODO: Implementar TABs
//TODO: Fades de Scroll
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Meter o botão SubmitBtn id="DelBtn" a dar delete dos registos selecionados. Os registos selecionados são aqueles 
//? Se quiseres determinar quais é que estão selecionados para eliminar, podes ver se o <div className="agentBox"> contém 
//? um <button id="bin-up">, se quiseres tbm podes atribuir um id de tipo "Selected" ao div "agentBox", eu n usei nada no CSS com o ID
//? de "record" que tinhas dado, por isso podes mexer ou eliminar esse id se n precisares dele

function MainWindow({ name, filter, windowReset }) {
	const [showSubmit, setShowSubmit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
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
				<RecordList records={records} deleteHandler={deleteRecord} setShowDelete={setShowDelete} />
				{showDelete !== false && (
					<SubmitBtn
						btnId="DelBtn"
						btnText="Eliminar"
					//TODO: handleClick={deleteRecordsWrapper}
					/>
				)}
			</div>
		</div>
	);
}

export default MainWindow;
