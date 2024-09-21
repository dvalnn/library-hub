package app

import "gorm.io/gorm"

type Record struct {
	gorm.Model
	Agent         AgentKind `gorm:"NotNull"   json:"agent"`
	ProcessNumber uint      `gorm:"NotNull"   json:"process_number"` // Actor's process number
	Event         Activity  `gorm:"NotNull"   json:"event"`
}
