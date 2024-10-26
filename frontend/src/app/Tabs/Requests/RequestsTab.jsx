import { useState } from "react";
import RequestsCalendar from "./RequestsCalendar";
import RequestsView from "./RequestsView";

function RequestsTab() {
	const [date, setDate] = useState(new Date());
	return (
		<div className="tab" id="requestsTab">
			<RequestsCalendar dateState={{ date, setDate }}/>
			{/* <RequestsView date={date} filter={"teacher"}/> */}
		</div>
	);
}

export default RequestsTab;
