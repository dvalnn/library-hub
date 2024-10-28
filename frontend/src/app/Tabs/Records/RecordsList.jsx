import { useEffect } from "react";

import Record from "./Record.jsx";
import noDoc from "../../../assets/images/noDoc.png";

function RecordsList({ records, recordHandlers, setShowDelete }) {
	useEffect(() => {
		// Only update setShowDelete when the records change
		if (records.length === 0) {
			setShowDelete(false);
		} else {
			setShowDelete(true);
		}
	}, [records, setShowDelete]); // Depend on records to trigger the effect

	if (records.length === 0) {
		return (
			<div className="noResults">
				<img id="Doc" src={noDoc} alt="Imagem nenhum item encontrado" />
				<h2>Sem registos recentes</h2>
			</div>
		);
	}

	// Sort records before rendering
	const sortedRecords = [...records].sort((a, b) => b.ID - a.ID);
	return (
		<div className="resultsContainer">
			{sortedRecords.map((record, index) => (
				<Record
					record={record}
					handlers={recordHandlers}
					key={record.ID || index}
				/>
			))}
		</div>
	);
}

export default RecordsList;
