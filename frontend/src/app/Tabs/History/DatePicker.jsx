import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import AgentFilterRadio from "../Common/AgentFilterRadio.jsx";

function DatePicker({ filterState, dateState }) {
	const onClickDay = (value, event) => {
		dateState.setDate(value);
	};

	const allAgentOptions = [
		{ labelName: "Aluno", labelState: "student" },
		{ labelName: "Professor", labelState: "teacher" },
		{ labelName: "Assistente", labelState: "assistant" },
		{ labelName: "Todos", labelState: "everyone" },
	  ];

	return (
		<div id="datePicker">
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
					options={allAgentOptions}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
