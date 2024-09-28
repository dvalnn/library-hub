import { useState } from "react";

import { BinButton, SelectButton } from "./buttons.jsx";
import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs, btnType }) {
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
		<div className="agentInfo" id={divID}>
			{btnType === 1 ? (
				<SelectButton isSelected={isSelected} handleClick={handleClick} />
			) : (
				<BinButton />
			)}
			<li className="newRegist">
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
