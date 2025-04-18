import { useState } from "react";

import ActivityEnum from "../Common/activityEnum.js";
import AgentEnum from "../Common/agentEnum.js";

function ActivityDropDown({ agent, setActivity }) {
	const enumObject = (enumMember) => {
		return {
			label: ActivityEnum.getLabel(enumMember),
			value: enumMember,
		};
	};

	// Mapping activity options for the select box based on agentKind
	const getOptions = () => {
		switch (agent.agent_kind) {
			case AgentEnum.Student: // Students
				return [
					enumObject(ActivityEnum.Computers),
					enumObject(ActivityEnum.ComputersGames),
					enumObject(ActivityEnum.Recreation),
					enumObject(ActivityEnum.RecreationSmartphone),
					enumObject(ActivityEnum.GroupWork),
					enumObject(ActivityEnum.IndividualWork),
					enumObject(ActivityEnum.TestTaking),
					enumObject(ActivityEnum.ExpulsionFromClass),
				];
			case AgentEnum.Teacher: // Teachers
				return [
					enumObject(ActivityEnum.Computers),
					enumObject(ActivityEnum.IndividualWork),
					enumObject(ActivityEnum.BookRequisition),
				];
			case AgentEnum.Assistant: // Assistants
				return [
					enumObject(ActivityEnum.ComputersWork),
					enumObject(ActivityEnum.ComputersGames),
				];
			default:
				return [];
		}
	};

	const [selection, setSelection] = useState("0");

	const handleChange = (e) => {
		const value = e.target.value;
		setSelection(value);
		setActivity(Number.parseInt(value));
	};

	const options = getOptions();
	const selectID = selection === "0" ? "invalid" : "valid";
	return (
		<div className="dropDown">
			<select id={selectID} value={selection} onChange={handleChange}>
				<option value="0" disabled>
					Selecione atividade
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default ActivityDropDown;
