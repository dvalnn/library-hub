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

	// Helper function to get value based on label
	getValue(label) {
		const values = {
			student: this.Student,
			teacher: this.Teacher,
			assistant: this.Assistant,
		};

		return values[label] || 0; // return null if label is not found
	},
};

export default AgentEnum;
