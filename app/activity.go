package app

type Activity uint

const (
	Computers          Activity = iota + 1 // All Agents
	IndivitualWork                         // Students
	GroupWork                              // Students
	Recreation                             // All Agents
	ExpulsionFromClass                     // Students
	BookRequisition                        // Teachers
)

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
