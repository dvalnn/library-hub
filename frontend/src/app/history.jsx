import { useState } from "react";
import Calendar from "react-calendar";
import RecordList from "./recordList";
import "react-calendar/dist/Calendar.css";
import { RadioSelector } from "./searchBar";

// import { RadioSelector } from "./searchBar";

//? Tou a pensar fazer esta tab sendo apenas a janela divido em dois tipo main window.
//? A da esquerda é um calendário sempre em display com um date picker, e mais uns botões de filtros
//? A da direita fica igual à janela de Registos mas sem o botão de eliminar
//? Talvez simplesmente chamar o recordList e mudar a função para receber o ID do parent e dar conditional render ao butão do lixo

function DatePicker({ radioSelection, setRadioSelection }) {
	const maxDate = new Date();
	return (
		<div className="datePicker">
			<div className="calendarBox">
				<Calendar locale="pt" maxDate={maxDate} />
				<RadioSelector
					selection={radioSelection}
					setSelection={setRadioSelection}
				/>
			</div>
		</div>
	);
}

function History() {
	return (
		<div className="history">
			<h1>Histórico</h1>
			{/* <RecordList records={records}/> */}
		</div>
	);
}

export { DatePicker, History };
