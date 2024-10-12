import { useState } from "react";

import DatePicker from "./DatePicker.jsx";
import HistoryView from "./HistoryView.jsx";

function HistoryTab() {
	const [filter, setFilter] = useState("everyone");
	return (
		<div className="tab" id="historyTab">
			<DatePicker radioSelection={filter} setRadioSelection={setFilter} />
			<HistoryView />
		</div>
	);
}

export default HistoryTab;
