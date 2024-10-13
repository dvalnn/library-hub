import { useState, useEffect } from "react";

import noDoc from "../../../assets/images/noDoc.png";

import ActivityEnum from "../Common/activityEnum.js";
import AgentEnum from "../Common/agentEnum.js";

import HistoricalRecord from "./HistoricalRecord.jsx";
import getHistoricalRecords from "./getHistoricalRecords.js";

function HistoryView({ date, filter }) {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		console.log(`Selected date: ${date}, filter: ${filter}`);
		getHistoricalRecords(date, filter)
			.then((foundRecords) => {
				setRecords(foundRecords);
			})
			.catch((error) => {
				console.error("Error fetching historical records:", error);
			});
	}, [date, filter]);

	const NoResultsMessage = () => (
		<ul className="noResults">
			<img id="Doc" src={noDoc} alt="No records found" />
			<h2>Sem registos recentes</h2>
		</ul>
	);

	const RecordItem = ({ record }) => {
		const time = new Date(record.UpdatedAt).toLocaleString("pt-PT");
		return (
			<div className="agentBox" id="record" key={record.ID}>
				<li className="agentInfo">
					<div className="nameTime">
						<h1 className="name">{record.agent.name}</h1>
						<h2 className="time">{time}</h2>
					</div>
					<div className="details">
						<h2>{`${AgentEnum.getLabel(record.agent.agent_kind)} ${record.agent.class}`}</h2>
						<h2 className="activity">
							{ActivityEnum.getLabel(record.activity)}
						</h2>
					</div>
				</li>
			</div>
		);
	};

	const RecordsList = () => {
		const sortedRecords = [...records].sort((a, b) => b.ID - a.ID);
		return (
			<ul className="resultsContainer">
				{sortedRecords.map((record) => (
					<RecordItem key={record.ID || record.index} record={record} />
				))}
			</ul>
		);
	};

	return (
		<div className="history">
			<h1 className="title">Histórico</h1>
			{records.length !== 0 ? <RecordsList /> : <NoResultsMessage />}
		</div>
	);
}

export default HistoryView;
