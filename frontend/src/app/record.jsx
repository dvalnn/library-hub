import { useState } from "react";
import { BinButton } from "./buttons.jsx";
import { ActivityEnum } from "./js/ActivityEnum.js";

function Record({ record, deleteHandler }) {
	const [binId, setBinId] = useState("bin-down")
	const date = new Date(record.CreatedAt);
	let role = "";
	switch (record.agent.agent_kind) {
		case 1:
			role = "Aluno" + " " + record.agent.class;
			break;
		case 2:
			role = "Professor";
			break;
		case 3:
			role = "Assistente";
			break;
		default:
			role = "Não Definido";
			break;
	}
	return (
		<div className="agentBox" id="record">
			<BinButton
				handleClick={() => {
					binId === "bin-down" ? setBinId("bin-up") : setBinId("bin-down");
				}}
				binID={binId}
			/>
			<li className="agentInfo">
				<div className="nameTime">
					<h1 className="name">{record.agent.name}</h1>
					<h2 className="time">{date.toLocaleString()}</h2>
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
