const AgentEnum = {
	Student: 1,
	Teacher: 2,
	Assistant: 3,

	// Helper function to get label based on value
	getLabel(value) {
		const labels = {
			[this.Student]: "Aluno",
			[this.Teacher]: "Professor",
			[this.Assistant]: "Assistente",
		};

		return labels[value] || "Unknown Agent";
	},
};

export default AgentEnum;
