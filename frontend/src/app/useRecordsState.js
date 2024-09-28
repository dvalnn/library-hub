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
				agent: element.agent,
			};

			CreateRecord(record)
				.then((record) => {
					console.log(`created: ${JSON.stringify(record)}`);
					appendToRecords(record);
				})
				.catch((err) => {
					console.error(`error: ${err}`);
				});
		});
	};

	const deleteRecord = (idToDelete) => {
		const deleteIdx = records.findIndex((item) => item.ID === idToDelete);
		if (existingItemIndex === -1) {
			console.erro("Trying to delete record not present in state");
			return;
		}

		DeleteRecord({ id: records[deleteIdx].ID })
			.then(() => {
				const updatedRecords = [...records];
				updatedRecords.splice(deleteIdx);
				setRecords(updatedRecords);
				console.log(`deleted record ${deleteIdx}`);
			})
			.catch((err) => {
				console.error(`error deleting record: ${err}`);
			});
	};

	return [records, createRecords, deleteRecord];
}

export default useRecordsState;
