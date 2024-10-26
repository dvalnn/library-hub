function HistoricalRecord({ record }) {
	const date = new Date(record.UpdatedAt);
	return (
		<div className="agentBox" id="record">
			<div className="agentInfo">
				<div className="nameTime">
					<h1 className="name">{record.agent.name}</h1>
					<h2 className="time">{date.toLocaleString("pt-Pt")}</h2>
				</div>
				<div className="details">
					<h2>{role}</h2>
					<h2 className="activity">{ActivityEnum.getLabel(record.activity)}</h2>
				</div>
			</div>
		</div>
	);
}

export default HistoricalRecord;
