import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import AgentFilterRadio from "../Common/AgentFilterRadio.jsx";

function DatePicker({ radioSelection, setRadioSelection }) {
	const maxDate = new Date();
	return (
		<div className="datePicker">
			<div className="calendarBox">
				<Calendar locale="pt" maxDate={maxDate} />
				<AgentFilterRadio
					selection={radioSelection}
					setSelection={setRadioSelection}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
