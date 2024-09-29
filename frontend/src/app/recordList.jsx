import Record from "./record.jsx";
import noDoc from "../assets/images/noDoc.png";

function RecordList({ records, recordHandlers, setShowDelete }) {
	if (records.length === 0) {
		setShowDelete(false);
		return (
			<ul className="noResults">
				<img id="Doc" src={noDoc} alt="Imagem nenhum item encontrado" />
				<li>Sem registos recentes</li>
			</ul>
		);
	}

	setShowDelete(true);
	const sortedRecords = [...records].sort((a, b) => b.ID - a.ID);
	return (
		<ul className="resultsContainer">
			{sortedRecords.map((record, index) => (
				<Record
					record={record}
					handlers={recordHandlers}
					key={record.ID || index}
				/>
			))}
		</ul>
	);
}

export default RecordList;
