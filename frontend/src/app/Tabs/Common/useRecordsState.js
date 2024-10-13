import { useState } from "react";

import { CreateRecord, DeleteRecord } from "../../../../wailsjs/go/app/App.js";

function useRecordsState(eventSetters) {
	const [records, setRecords] = useState([]);
	const [deleteIds, setDeleteIds] = useState([]);

	const [success, warning, error] = eventSetters;

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
					return created;
				})
				.catch((err) => {
					error("Selecione uma atividade!");
					return null; // Allow Promise.all to continue even on failure
				});
		});

		// Wait for all promises to resolve
		Promise.all(recordPromises)
			.then((newRecords) => {
				const validRecords = newRecords.filter((record) => record !== null);
                if(!validRecords.length){
                    warning("Nenhum registo criado.")
                    return
                }
				// Update records state
				setRecords((prevRecords) => [...prevRecords, ...validRecords]);
				success(`${validRecords.length} registos criados com sucesso!`);
			})
			.catch((err) => {
				console.error(`Error creating records: ${err}`);
				error(`Erro ao criar registos: ${err}`);
			});
	};

	const deleteRecord = (idToDelete) => {
		const recordToDelete = records.find((record) => record.ID === idToDelete);
		if (!recordToDelete) {
			console.error(
				`Delete record ${idToDelete}: not present in records state`,
			);
            error("Erro ao apagar registo");
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
				success("Registo apagado.");
			})
			.catch((err) => {
				console.error(`Error deleting record: ${err}`);
                error("Erro ao apagar registo.")
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
