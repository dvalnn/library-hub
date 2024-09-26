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

function Agent({ agent, btnType }) {
	let button;
	if (btnType === 1) {
		button = (
			<button
				type="button"
				className="registBtn"
				id="plusButton"
				onClick="newRecord()"
			>
				<svg
					className="plusIcon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 30 30"
				>
					<title>selecionar</title>
					<g mask="url(#mask0_21_345)">
						<path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
					</g>
				</svg>
			</button>
		);
	} else {
		button = (
			<button type="button" id="bin-button">
				<svg
					className="bin-top"
					viewBox="0 0 39 7"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>apagar</title>
					<line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
					<line
						x1="12"
						y1="1.5"
						x2="26.0357"
						y2="1.5"
						stroke="white"
						strokeWidth="3"
					/>
				</svg>
				<svg
					className="bin-bottom"
					viewBox="0 0 33 39"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>apagar</title>
					<mask id="path-1-inside-1_8_19" fill="white">
						<path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
					</mask>
					<path
						d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
						fill="white"
						mask="url(#path-1-inside-1_8_19)"
					/>
					<path d="M12 6L12 29" stroke="white" strokeWidth="4" />
					<path d="M21 6V29" stroke="white" strokeWidth="4" />
				</svg>
			</button>
		);
	}
	return (
		<div className="icon-and-info">
			{button}
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} />
			</li>
		</div>
	);
}

export default Agent;
