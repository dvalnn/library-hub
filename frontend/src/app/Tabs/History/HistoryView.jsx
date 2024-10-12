import { useState, useEffect } from "react";

import noDoc from "../../../assets/images/noDoc.png";

import ActivityEnum from "../Common/activityEnum.js";
import AgentEnum from "../Common/agentEnum.js";

import HistoricalRecord from "./HistoricalRecord.jsx";
import getHistoricalRecords from "./getHistoricalRecords.js";

//? Tou a pensar fazer esta tab sendo apenas a janela divido em dois tipo main window.
//? A da esquerda é um calendário sempre em display com um date picker, e mais uns botões de filtros
//? A da direita fica igual à janela de Registos mas sem o botão de eliminar
//? Talvez simplesmente chamar o recordList e mudar a função para receber o ID do parent e dar conditional render ao butão do lixo
function HistoryView({ date, filter }) {
	const [records, setRecords] = useState([]);
	useEffect(() => {
        console.log(`date: ${date} filter: ${filter}`)
		getHistoricalRecords(date, filter)
			.then((found) => {
				setRecords(found);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [date, filter]);

	const noResults = (
		<ul className="noResults">
			<img id="Doc" src={noDoc} alt="Imagem nenhum item encontrado" />
			<li>Sem registos recentes</li>
		</ul>
	);

	const sortedRecords = [...records].sort((a, b) => b.ID - a.ID);
	const results = (
		<ul className="resultsContainer">
			{sortedRecords.map((record, index) => (
				<div className="agentBox" id="record" key={record.ID || index}>
					<li className="agentInfo">
						<div className="nameTime">
							<h1 className="name">{record.agent.name}</h1>
							<h2 className="time">{date.toLocaleString("pt-Pt")}</h2>
						</div>
						<div className="details">
							<h2>{`${AgentEnum.getLabel(record.agent.agent_kind)} ${record.agent.class}`}</h2>
							<h2 className="activity">
								{ActivityEnum.getLabel(record.activity)}
							</h2>
						</div>
					</li>
				</div>
			))}
		</ul>
	);

	return (
		<div className="history">
			<h1>Histórico</h1>
			{results.length !== 0 && results}
			{results.length === 0 && noResults}
		</div>
	);
}

export default HistoryView;
