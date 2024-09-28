import { useEffect, useState } from "react";

function ActivitySelect({ agent, setActivity }) {
	// Enum for activity types
	const Activity = {
		Computers: 1,
		IndividualWork: 2,
		GroupWork: 3,
		Recreation: 4,
		ExpulsionFromClass: 5,
		BookRequisition: 6,
		TestTaking: 7,
	};

	const Agents = {
		Student: 1,
		Teacher: 2,
		Assistant: 3,
	};

	// Mapping activity options for the select box based on agentKind
	const getOptions = () => {
		switch (agent.agent_kind) {
			case Agents.Student: // Students
				return [
					{ label: "Computadores", value: Activity.Computers },
					{ label: "Espaço Lúdico", value: Activity.Recreation },
					{ label: "Trabalho de grupo", value: Activity.GroupWork },
					{ label: "Trabalho individual", value: Activity.IndividualWork },
					{ label: "Realização de Testes", value: Activity.TestTaking },
					{
						label: "Expulso da Sala de Aula",
						value: Activity.ExpulsionFromClass,
					},
				];
			case Agents.Teacher: // Teachers
				return [
					{ label: "Computadores", value: Activity.Computers },
					{ label: "Espaço Lúdico", value: Activity.Recreation },
					{ label: "Trabalho individual", value: Activity.IndividualWork },
					// { label: "Requisição de livros", value: Activity.BookRequisition },
				];
			case Agents.Assistant: // Assistants
				return [
					{ label: "Computadores", value: Activity.Computers },
					{ label: "Espaço Lúdico", value: Activity.Recreation },
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
