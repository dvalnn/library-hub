function ActivitySelect({ userType, setActivity }) {
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

	// Mapping activity options for the select box based on userType
	const getOptions = () => {
		switch (userType) {
			case 1: // Students
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
			case 2: // Teachers
				return [
					{ label: "Computadores", value: Activity.Computers },
					{ label: "Espaço Lúdico", value: Activity.Recreation },
					{ label: "Trabalho individual", value: Activity.IndividualWork },
					// { label: "Requisição de livros", value: Activity.BookRequisition },
				];
			case 3: // Assistants
				return [
					{ label: "Computadores", value: Activity.Computers },
					{ label: "Espaço Lúdico", value: Activity.Recreation },
				];
			default:
				return [];
		}
	};

	const options = getOptions();

	return (
		<select
			id="drop_act"
			defaultValue=""
			onChange={(e) => setActivity(e.target.value)} // Setting the activity based on the selected option
		>
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
