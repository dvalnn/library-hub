import ActivitySelect from "./activitySelect.jsx";

function AgentDetails({ agent, isSelected, setActivity }) {
	let role = "";
	switch (agent.agent_kind) {
		case 1:
			role = "Aluno";
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
    //TODO: Miguel, centra o agent.class mesmo quando não existe o activitySelect
	return (
		<div className="details">
			<h2>{role}</h2>
			{agent.agent_kind === 1 && <h2>{agent.class}</h2>}
			{isSelected && <ActivitySelect agent={agent} setActivity={setActivity} />}
		</div>
	);
}

export default AgentDetails;
