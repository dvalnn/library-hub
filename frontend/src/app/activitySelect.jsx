import { ActivityEnum } from "./js/ActivityEnum";
import { AgentEnum } from "./js/AgentEnum";

function ActivitySelect({ agent, setActivity }) {
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
					enumObject(ActivityEnum.Recreation),
					enumObject(ActivityEnum.GroupWork),
					enumObject(ActivityEnum.IndividualWork),
					enumObject(ActivityEnum.TestTaking),
					enumObject(ActivityEnum.ExpulsionFromClass),
				];
			case AgentEnum.Teacher: // Teachers
				return [
					enumObject(ActivityEnum.Computers),
					enumObject(ActivityEnum.Recreation),
					enumObject(ActivityEnum.IndividualWork),
					// enumObject(ActivityEnum.BookRequisition), // Uncomment if needed
				];
			case AgentEnum.Assistant: // Assistants
				return [
					enumObject(ActivityEnum.Computers),
					enumObject(ActivityEnum.Recreation),
				];
			default:
				return [];
		}
	};
	const handleChange = (e) => {
		const value = e.target.value;
		setActivity(Number.parseInt(value));
	};

	const options = getOptions();

	return (
		<select id="drop_act" defaultValue="" onChange={handleChange}>
			<option value="" disabled>
				Selecione atividade
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}

export default ActivitySelect;
