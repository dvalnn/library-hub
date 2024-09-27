import { useState } from "react";

function useSelectionState() {
	const [selection, setSelection] = useState([]);

	const upsertSelection = (itemToAppend) => {
		console.log(`appending: ${JSON.stringify(itemToAppend)}`);

		// Check if the item with the same id already exists in the selection
		const existingItemIndex = selection.findIndex(
			(item) => item.id === itemToAppend.id,
		);

		if (existingItemIndex !== -1) {
			// Update act if the item exists
			const updatedSelection = [...selection];
			updatedSelection[existingItemIndex].act = itemToAppend.act;
			setSelection(updatedSelection);
		} else {
			// Append the new item if it doesn't exist
			setSelection([...selection, itemToAppend]);
		}
	};

	const removeFromSelection = (itemToRemove) => {
		console.log(`removing: ${JSON.stringify(itemToRemove)}`);
		const updatedSelection = selection.filter(
			(item) => item.id !== itemToRemove.id,
		);
		setSelection(updatedSelection);
	};

	const checkSelection = (itemIdToFind) => {
		// Check if an item with the specified id exists in the selection
		return selection.some((item) => item.id === itemIdToFind);
	};

	const clearSelection = () => {
		setSelection([]);
	};

	return [
		selection,
		upsertSelection,
		removeFromSelection,
		checkSelection,
		clearSelection,
	];
}

export default useSelectionState;
