import { SearchAgent, SearchByClass } from "./../../../wailsjs/go/app/App.js";

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

	// Check if the query starts with "turma: "
	if (query.startsWith("turma: ")) {
		// Extract the "xxxx" part
		const turmaCode = query.slice(7).toUpperCase(); // Remove the "turma: " part (7 characters)
		// Call the async dedicated handler with turmaCode and await its result
		try {
			const turmaMatches = await SearchByClass(turmaCode);
			console.log(`found ${turmaMatches.length} turma matches`);
			return turmaMatches; // Return the matches from the dedicated handler
		} catch (error) {
			console.error("Error in dedicated handler:", error);
			return []; // Return empty array in case of error in the dedicated handler
		}
	}

	console.log(`Performing search for: ${query} (filter = ${filterStr})`);
	const filter = filterFromString(filterStr);
	try {
		// Wait for the search results to resolve
		const matches = await SearchAgent(query, filter);
		console.log(`found ${matches.length} matches`);
		return matches; // Return the matches if needed elsewhere
	} catch (error) {
		console.error("Error performing search:", error);
		return []; // Return empty array in case of error
	}
}

export default performSearch;
