const ActivityEnum = {
	Computers: 1,
	IndividualWork: 2,
	GroupWork: 3,
	Recreation: 4,
	ExpulsionFromClass: 5,
	BookRequisition: 6,
	TestTaking: 7,

    // Additional activities for students
    ComputersGames: 8,
    RecreationSmartphone: 9,

	// Helper function to get label based on value
	getLabel(value) {
		const labels = {
			[this.Computers]: "Computadores Trabalho",
			[this.IndividualWork]: "Trabalho individual",
			[this.GroupWork]: "Trabalho de grupo",
			[this.Recreation]: "Espaço Lúdico Jogos",
			[this.ExpulsionFromClass]: "Expulso da Sala de Aula",
			[this.BookRequisition]: "Requisição de livros",
			[this.TestTaking]: "Realização de Testes",

			[this.ComputersGames]: "Computadores Jogos",
            [this.RecreationSmartphone]: "Espaço Lúdico Telemóvel",
		};

		return labels[value] || "Unknown Activity";
	},

	// Helper function to get value based on label
	getValue(label) {
		const values = {
			Computers: this.Computers,
			IndividualWork: this.IndividualWork,
			GroupWork: this.GroupWork,
			Recreation: this.Recreation,
			ExpulsionFromClass: this.ExpulsionFromClass,
			BookRequisition: this.BookRequisition,
			TestTaking: this.TestTaking,

            ComputersGames: this.ComputersGames,
            RecreationSmartphone: this.RecreationSmartphone,
		};

		return values[label] || null; // return null if label is not found
	},
};

export default ActivityEnum;
