import { useState } from "react";

import BinButton from "../Common/BinButton.jsx";
import ActivityEnum from "../Common/activityEnum.js";
import AgentEnum from "../Common/agentEnum.js";

function Record({ record, handlers }) {
	const [binId, setBinId] = useState("bin-down");
	const date = new Date(record.CreatedAt);
	const role = `${AgentEnum.getLabel(record.agent.agent_kind)} ${record.agent.class}`;

	const clickHandler = () => {
		if (handlers.checkMark(record.ID)) {
			setBinId("bin-down");
			handlers.removeMark(record.ID);
		} else {
			setBinId("bin-up");
			handlers.markRecord(record.ID);
		}
	};

	return (
		<div className="agentBox" id="record">
			<BinButton handleClick={clickHandler} binID={binId} />
			<li className="agentInfo">
				<div className="nameTime">
					<h1 className="name">{record.agent.name}</h1>
					<h2 className="time">{date.toLocaleString("pt-Pt")}</h2>
				</div>
				<div className="details">
					<h2>{role}</h2>
					<h2 className="activity">{ActivityEnum.getLabel(record.activity)}</h2>
				</div>
			</li>
		</div>
	);
}

export default Record;
