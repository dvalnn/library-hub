import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function RequestsCalendar({ dateState }) {
    const onClickDay = (value, event) => {
        dateState.setDate(value);
    };

    return (
        <div id="datePicker">
            <div className="calendarBox">
                <Calendar
                    locale="pt"
                    maxDate={new Date()}
                    onClickDay={onClickDay}
                    value={dateState.date}
                />
            </div>
        </div>
    );
}

export default RequestsCalendar;