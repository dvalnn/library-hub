import { SearchAgent } from "./../../wailsjs/go/app/App.js";

function filterFromString(filter) {
	switch (filter) {
		case "student":
			return 1;
		case "teacher":
			return 2;
		case "assistant":
			return 3;
		default:
			return 0;
	}
}

async function performSearch(query, filterStr) {
	// Return early if the search query is empty
	if (!query) {
		console.log("empty search - skipping");
		return [];
	}

	console.log(`Performing search for: ${query} (filter = ${filterStr})`);
	const filter = filterFromString(filterStr);
	try {
		// Wait for the search results to resolve
		const matches = await SearchAgent(query, filter);
		console.log(`${JSON.stringify(matches)}`);
		return matches; // Return the matches if needed elsewhere
	} catch (error) {
		console.error("Error performing search:", error);
		return []; // Return empty array in case of error
	}
}

export default performSearch;
