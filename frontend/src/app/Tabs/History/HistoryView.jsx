import { useState, useEffect } from "react";

import noDoc from "../../../assets/images/noDoc.png";

import ActivityEnum from "../Common/activityEnum.js";
import AgentEnum from "../Common/agentEnum.js";

import HistoricalRecord from "./HistoricalRecord.jsx";
import getHistoricalRecords from "./getHistoricalRecords.js";

//! BUG ON Agent recorded time

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
			<h2>Sem registos recentes</h2>
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
							{/* <h2 className="time">{Date(.toLocaleString("pt-Pt"))}</h2> */} //!Bug here
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
			<h1 className="title">Histórico</h1>
			{records.length !== 0 && results}
			{records.length === 0 && noResults}
		</div>
	);
}

export default HistoryView;
