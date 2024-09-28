import Record from "./record.jsx";

function RecordList({ records }) {
	return (
		<ul className="resultsContainer">
			{records.map((record, index) => (
				<Record record={record} key={record.ID || index} />
			))}
		</ul>
	);
}

export default RecordList;
