import { useState } from "react";

import { BinButton, SelectButton } from "./buttons.jsx";
import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs, btnType }) {
	const [appendFunc, removeFunc, checkFunc] = selectionFuncs;
	const [activity, setActivity] = useState("ACTIVITY UNDEFINED"); // TODO: integrate this

	const isSelected = checkFunc({ agent, activity });
	const clickFunc = isSelected ? removeFunc : appendFunc;
	const handleClick = () => {
		clickFunc({ agent, activity });
	};

	const divID = isSelected ? "selected" : "notSelected";

	return (
		<div className="agentInfo" id={divID}>
			{btnType === 1 ? <SelectButton isSelected={isSelected} handleClick={handleClick} /> : <BinButton />}
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} setActivity={setActivity} />
			</li>
		</div>
	);
}

export default Agent;
