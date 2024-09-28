// AgentEnum.js
export const AgentEnum = {
	Student: 1,
	Teacher: 2,
	Assistant: 3,

	// Helper function to get label based on value
	getLabel(value) {
		const labels = {
			[this.Student]: "Student",
			[this.Teacher]: "Teacher",
			[this.Assistant]: "Assistant",
		};

		return labels[value] || "Unknown Agent";
	},
};
