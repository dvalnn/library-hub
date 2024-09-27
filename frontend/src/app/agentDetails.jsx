import ActivitySelect from "./activitySelect.jsx";

function AgentDetails({ agent, setActivity }) {
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
	return (
		<div className="details">
			<h2>{role}</h2>
			{agent.agent_kind === 1 && <h2>{agent.class}</h2>}
			<ActivitySelect userType={agent.agent_kind} setActivity={setActivity} />
		</div>
	);
}

export default AgentDetails;
