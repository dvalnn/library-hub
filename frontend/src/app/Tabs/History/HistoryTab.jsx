import { useState } from "react";

import DatePicker from "./DatePicker.jsx";
import HistoryView from "./HistoryView.jsx";

function HistoryTab() {
	const [filter, setFilter] = useState("everyone");
	const [date, setDate] = useState(new Date());
	return (
		<div className="tab" id="historyTab">
			<DatePicker
				filterState={{ filter, setFilter }}
				dateState={{ date, setDate }}
			/>
			<HistoryView date={date} filter={filter}/>
		</div>
	);
}

export default HistoryTab;
