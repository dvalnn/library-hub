function ActivitySelect({ userType }) {
	switch (userType) {
		case 1:
			return (
				<select id="drop_act" defaultValue="Selecione atividade">
					{/* <option value="" disabled selected>
						Selecione atividade
					</option> */}
					<option value="Computadores">Computadores</option>
					<option value="Trabalho individual">Trabalho individual</option>
					<option value="Espaço Lúdico">Espaço Lúdico</option>
					<option value="Trabalho de grupo">Trabalho de grupo</option>
					<option value="Realização de testes">Realização de testes</option>
					<option value="Expulso da Sala de Aula">
						Expulso da Sala de Aula
					</option>
				</select>
			);
		case 2:
			return (
				<select id="drop_act" defaultValue="Selecione atividade">
					{/* <option value="" disabled selected>
						Selecione atividade
					</option> */}
					<option value="Computadores">Computadores</option>
					<option value="Trabalho individual">Trabalho individual</option>
					<option value="Espaço Lúdico">Espaço Lúdico</option>
					<option value="Trabalho de grupo">Trabalho de grupo</option>
				</select>
			);
		case 3:
			return (
				<select id="drop_act" defaultValue="Selecione atividade">
					{/* <option value="" disabled selected>
						Selecione atividade
					</option> */}
					<option value="Computadores">Computadores</option>
					<option value="Espaço Lúdico">Espaço Lúdico</option>
				</select>
			);
		default:
			return <select id="drop_act" defaultValue="Selecione atividade" />;
	}
}

function AgentDetails({ agent }) {
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
			<ActivitySelect userType={agent.agent_kind} />
		</div>
	);
}

function Agent({ agent, button }) {
	return (
		<div className="icon-and-info">
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} />
			</li>
		</div>
	);
}

export default Agent;
