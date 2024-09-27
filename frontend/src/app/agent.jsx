import { useState } from "react";

import { BinButton, SelectButton } from "./buttons.jsx";
import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs, btnType }) {
	const [upsertFunc, removeFunc, checkFunc] = selectionFuncs;
	const [activity, setActivity] = useState("ACTIVITY UNDEFINED"); // TODO: integrate this

	const isSelected = checkFunc(agent.ID);
	const clickFunc = isSelected ? removeFunc : upsertFunc;
	const handleClick = () => {
		clickFunc({ id: agent.ID, act: activity });
	};

	const divID = isSelected ? "selected" : "notSelected";

	return (
		<div className="agentInfo" id={divID}>
			{btnType === 1 ? (
				<SelectButton isSelected={isSelected} handleClick={handleClick} />
			) : (
				<BinButton />
			)}
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} setActivity={setActivity} />
			</li>
		</div>
	);
}

export default Agent;
