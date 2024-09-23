package app

type Activity uint

const (
	Computers          Activity = iota + 1 // All Agents
	IndivitualWork                         // Students / Teachers
	GroupWork                              // Students
	Recreation                             // All Agents
	ExpulsionFromClass                     // Students
	BookRequisition                        // Teachers
)

var AgentActivityMap = map[AgentKind][]Activity{
	STUDENT:   {Computers, IndivitualWork, GroupWork, Recreation, ExpulsionFromClass},
	TEACHER:   {Computers, IndivitualWork, Recreation, BookRequisition},
	ASSISTANT: {Computers, Recreation},
}

func (a Activity) String() string {
	return [...]string{
		"Undefined",
		"computer work",
		"individual work",
		"group work",
		"recreation",
		"expelled from class",
		"book requisition",
	}[a]
}
