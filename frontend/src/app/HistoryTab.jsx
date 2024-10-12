import { useState } from "react";

import { DatePicker, History } from "./history.jsx";

function HistoryTab() {
	const [filter, setFilter] = useState("everyone");
	return (
		<div className="tab" id="historyTab">
			<DatePicker radioSelection={filter} setRadioSelection={setFilter} />
			<History />
		</div>
	);
}

export default HistoryTab;
