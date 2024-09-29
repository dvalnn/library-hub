import { useState } from "react";

import { CreateRecord, DeleteRecord } from "../../../wailsjs/go/app/App.js";

function useRecordsState() {
	const [records, setRecords] = useState([]);
	const [deleteIds, setDeleteIds] = useState([]);

	const createRecords = (selectionState) => {
		// Map over selectionState to create promises for CreateRecord
		const recordPromises = selectionState.map((element) => {
			const record = {
				activity: element.act,
				agent: element.agent,
			};

			// Return the promise from CreateRecord
			return CreateRecord(record)
				.then((created) => {
					console.log(`Created record: ${JSON.stringify(created)}`);
					return created;
				})
				.catch((err) => {
					console.error(`Error creating record: ${err}`);
					return null; // Allow Promise.all to continue even on failure
				});
		});

		// Wait for all promises to resolve
		Promise.all(recordPromises)
			.then((newRecords) => {
				const validRecords = newRecords.filter((record) => record !== null);

				// Update records state
				setRecords((prevRecords) => [...prevRecords, ...validRecords]);
			})
			.catch((err) => {
				console.error(`Error resolving promises: ${err}`);
			});
	};

	const deleteRecord = (idToDelete) => {
		const recordToDelete = records.find((record) => record.ID === idToDelete);

		if (!recordToDelete) {
			console.error(
				`Delete record ${idToDelete}: not present in records state`,
			);
			return Promise.reject();
		}

		// Delete the record using the API
		return DeleteRecord({ id: recordToDelete.ID })
			.then(() => {
				// Update the records state after deletion
				setRecords((prevRecords) =>
					prevRecords.filter((record) => record.ID !== idToDelete),
				);
				console.log(`Deleted record ${recordToDelete.ID}`);
			})
			.catch((err) => {
				console.error(`Error deleting record: ${err}`);
				Promise.reject(err);
			});
	};

	const deleteMarkedRecords = () => {
		const idsToDelete = [...deleteIds]; // Copy deleteIds to avoid mutation

		for (const recId of idsToDelete) {
			deleteRecord(recId)
				.then(() => {
					removeMark(recId); // Remove from marked records after deletion
				})
				.catch((err) => {
					console.error(`Error deleting marked record ${recId}: ${err}`);
					removeMark(recId); // Remove from marked records after deletion
				});
		}
	};

	const markRecord = (recId) => {
		// Add recId to deleteIds if it's not already there
		setDeleteIds((prevDeleteIds) => {
			if (!prevDeleteIds.includes(recId)) {
				return [...prevDeleteIds, recId];
			}
			return prevDeleteIds;
		});
	};

	const checkIsMarked = (recId) => deleteIds.includes(recId);

	const removeMark = (recId) => {
		// Remove recId from deleteIds
		setDeleteIds((prevDeleteIds) => prevDeleteIds.filter((id) => id !== recId));
	};

	return [
		records,
		createRecords,
		markRecord,
		removeMark,
		checkIsMarked,
		deleteMarkedRecords,
	];
}

export default useRecordsState;
