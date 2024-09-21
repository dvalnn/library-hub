package app

import "gorm.io/gorm"

type AgentKind uint

const (
	STUDENT AgentKind = iota + 1
	TEACHER
	ASSISTANT
)

func (a AgentKind) String() string {
	return [...]string{
		"Undefined",
		"student",
		"teacher",
		"assistant",
	}[a]
}

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

type Record struct {
	gorm.Model
	Agent         AgentKind `gorm:"NotNull"   json:"agent"`
	ProcessNumber uint      `gorm:"NotNull"   json:"process_number"` // Actor's process number
	Event         Activity  `gorm:"NotNull"   json:"event"`
}
