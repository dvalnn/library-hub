package app

type Activity uint

const (
	ComputersWork      Activity = iota + 1 // All Agents
	IndividualWork                         // Students / Teachers
	GroupWork                              // Students
	RecreationGames                        // Students
	ExpulsionFromClass                     // Students
	BookRequisition                        // Teachers
	TestTaking                             // Teachers

	// New activities added at 18/4/25
	ComputersGames       // All Agents
	RecreationSmartphone // Students
)

var AgentActivityMap = map[AgentKind][]Activity{
	STUDENT: {
		ComputersWork,
		IndividualWork,
		GroupWork,
		RecreationGames,
		ExpulsionFromClass,
		TestTaking,
		ComputersGames,
		RecreationSmartphone
	},

	TEACHER: {
		ComputersWork,
		IndividualWork,
		BookRequisition
	},

	ASSISTANT: {
		ComputersWork,
		ComputersGames
	},
}

func (a Activity) String() string {
	return [...]string{
		"Undefined",
		"computer work",
		"individual work",
		"group work",
		"recreation games",
		"expelled from class",
		"book requisition",
		"test taking",

		// New activities 18/4
		"computer gaming",
		"recreation smartphone",
	}[a]
}
