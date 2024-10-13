import { SearchRecordsByDay } from "../../../../wailsjs/go/app/App.js";

import AgentEnum from "../Common/agentEnum.js";

async function getHistoricalRecords(date, filterStr) {
	// Adjust the date to local timezone before converting to ISO string
	const adjustedDate = new Date(
		date.getTime() - date.getTimezoneOffset() * 60000,
	);
	const day = adjustedDate.toISOString().split("T")[0];
	const filter = AgentEnum.getValue(filterStr);

	try {
		console.log(`trying records search: ${day}, ${filter}`);
		const results = await SearchRecordsByDay(day, filter);
		return results;
	} catch (error) {
		console.error("Error performing records search:", error);
		return [];
	}
}

export default getHistoricalRecords;
