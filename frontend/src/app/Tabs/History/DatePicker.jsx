import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import AgentFilterRadio from "../Common/AgentFilterRadio.jsx";

function DatePicker({ filterState, dateState }) {
	const onClickDay = (value, event) => {
		dateState.setDate(value);
	};

	return (
		<div className="datePicker">
			<div className="calendarBox">
				<Calendar
					locale="pt"
					maxDate={new Date()}
					onClickDay={onClickDay}
					value={dateState.date}
				/>
				<AgentFilterRadio
					selection={filterState.filter}
					setSelection={filterState.setFilter}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
