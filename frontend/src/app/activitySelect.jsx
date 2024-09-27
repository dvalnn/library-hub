function ActivitySelect({ userType, setActivity }) {
	// Define the activity options based on the userType
	const getOptions = () => {
		switch (userType) {
			case 1:
				return [
					"Computadores",
					"Trabalho individual",
					"Espaço Lúdico",
					"Trabalho de grupo",
					"Realização de testes",
					"Expulso da Sala de Aula",
				];
			case 2:
				return [
					"Computadores",
					"Trabalho individual",
					"Espaço Lúdico",
					"Trabalho de grupo",
				];
			case 3:
				return ["Computadores", "Espaço Lúdico"];
			default:
				return [];
		}
	};

	const options = getOptions();

	return (
		<select id="drop_act" defaultValue="Selecione atividade">
			<option value="" disabled>
				Selecione atividade
			</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

export default ActivitySelect;
