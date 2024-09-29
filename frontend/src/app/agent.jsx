import { useState } from "react";

import { SelectButton } from "./buttons.jsx";
import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs }) {
	const [upsertFunc, removeFunc, checkFunc] = selectionFuncs;
	const [activity, setActivity] = useState(0);

	const isSelected = checkFunc(agent.ID);
	const clickFunc = isSelected ? removeFunc : upsertFunc;

	const handleClick = () => {
		clickFunc({ agent: agent, act: activity });
	};

	const actSelectFunc = (newAct) => {
		upsertFunc({ agent: agent, act: newAct });
	};

	const divID = isSelected ? "selected" : "notSelected";

	return (
		<div className="agentBox" id={divID}>
			<SelectButton isSelected={isSelected} handleClick={handleClick} />
			<li className="agentInfo">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails
					agent={agent}
					isSelected={isSelected}
					setActivity={actSelectFunc}
				/>
			</li>
		</div>
	);
}

export default Agent;
