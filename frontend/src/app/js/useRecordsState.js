import { useState } from "react";

import { CreateRecord, DeleteRecord } from "../../../wailsjs/go/app/App.js";

function useRecordsState() {
	const [records, setRecords] = useState([]);

	const appendToRecords = (newRecord) => {
		setRecords([...records, newRecord]);
	};

	// TODO: ImplementThis
	const createRecords = (selectionState) => {
		// Map over selectionState to create promises from CreateRecord
		const recordPromises = selectionState.map((element) => {
			const record = {
				activity: element.act,
				agent: element.agent,
			};

			// Return the promise from CreateRecord
			return CreateRecord(record)
				.then((created) => {
					console.log(`created: ${JSON.stringify(created)}`);
					return created; // Return created record to resolve in Promise.all
				})
				.catch((err) => {
					console.error(`error: ${err}`);
					return null; // Handle errors but allow Promise.all to continue
				});
		});

		// Wait for all promises to resolve
		Promise.all(recordPromises).then((newRecords) => {
			// Filter out any null values from failed record creation
			const validRecords = newRecords.filter((record) => record !== null);

			// Update the state by appending the new records
			setRecords((prevRecords) => [...prevRecords, ...validRecords]);
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
