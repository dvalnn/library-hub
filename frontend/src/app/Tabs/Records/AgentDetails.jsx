import ActivityDropDown from "./ActivityDropDown.jsx";

function AgentDetails({ agent, isSelected, setActivity }) {
	let role = "";
	switch (agent.agent_kind) {
		case 1:
			role = `Aluno ${agent.class}`;
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
			{isSelected && <ActivityDropDown agent={agent} setActivity={setActivity} />}
		</div>
	);
}

export default AgentDetails;
