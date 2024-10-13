import {
	SearchAgent,
	SearchByClass,
} from "./../../../../wailsjs/go/app/App.js";

import AgentEnum from "../Common/agentEnum.js";

async function performAgentSearch(query, filterStr) {
	// Return early if the search query is empty
	if (!query) {
		return [];
	}

	const filter = AgentEnum.getValue(filterStr);
	const searchFunc = /^\d/.test(query.trim())
		? () => SearchByClass(query.toUpperCase())
		: () => SearchAgent(query, filter);

	try {
		// Wait for the search results to resolve
		const matches = await searchFunc();
		return matches; // Return the matches if needed elsewhere
	} catch (error) {
		console.error("Error performing agent search:", error);
		return []; // Return empty array in case of error
	}
}

export default performAgentSearch;
