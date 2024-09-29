import Record from "./record.jsx";
import noDoc from "../assets/images/noDoc.png";

//TODO: Tratar do deleteHandler

function RecordList({ records, deleteHandler, setShowDelete }) {
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
	return (
		<ul className="resultsContainer">
			{records.map((record, index) => (
				<Record
					record={record}
					deleteHandler={deleteHandler}
					key={record.ID || index}
				/>
			))}
		</ul>
	);
}

export default RecordList;
