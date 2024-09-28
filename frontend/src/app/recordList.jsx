import Record from "./record.jsx";

function RecordList({ records, deleteHandler }) {
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
