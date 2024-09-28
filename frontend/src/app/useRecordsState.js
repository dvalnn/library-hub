import { useState } from "react";

import { CreateRecord, DeleteRecord } from "../../wailsjs/go/app/App.js";

function useRecordsState() {
	const [records, setRecords] = useState([]);

	const appendToRecords = (newRecord) => {
		setRecords([...records, newRecord]);
	};

	// TODO: ImplementThis
	const createRecords = (selectionState) => {
		selectionState.map((element) => {
			const record = {
				activity: element.act,
				agent_id: element.id,
			};

			CreateRecord(record)
				.then((record) => {
					console.log(`created: ${JSON.stringify(record)}`);
					appendToRecords(record);
				})
				.catch((err) => {
					console.error(`error: ${err}`);
				})
				.finally(() => {
					console.log("record promise resolved");
				});
		});
	};

	return [records, createRecords];
}

export default useRecordsState;
