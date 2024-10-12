import { SearchAgent } from "./../../../../wailsjs/go/app/App.js";

import AgentEnum from "../Common/agentEnum.js"

async function performAgentSearch(query, filterStr) {
	// Return early if the search query is empty
	if (!query) {
		return [];
	}

	console.log(`Performing search for: ${query} (filter = ${filterStr})`);
	const filter = AgentEnum.getValue(filterStr)
	try {
		// Wait for the search results to resolve
		const matches = await SearchAgent(query, filter);
		console.log(`found ${matches.length} matches`);
		return matches; // Return the matches if needed elsewhere
	} catch (error) {
		console.error("Error performing agent search:", error);
		return []; // Return empty array in case of error
	}
}

export default performAgentSearch;
