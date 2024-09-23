package app

import (
	"fmt"

	"gorm.io/gorm"
)

type Record struct {
	gorm.Model
	Activity Activity `gorm:"NotNull" json:"event"`
	AgentID  uint     `gorm:"NotNull" json:"agent_id"`
	Agent    Agent
}

// TODO: make this more robust. Look into how gorm handles fk references
func (r *Record) validate() error {
	allowedActivities, ok := AgentActivityMap[r.Agent.AgentKind]
	if !ok {
		return fmt.Errorf("invalid agent kind")
	}

	for _, activity := range allowedActivities {
		if activity == r.Activity {
			return nil
		}
	}

	return fmt.Errorf(
		"invalid activity (%s) for agent (%s)",
		r.Activity,
		r.Agent.AgentKind,
	)
}

func (r *Record) create(db *gorm.DB) error {
	if err := r.validate(); err != nil {
		return err
	}

	if err := db.Create(r).Error; err != nil {
		return err
	}

	return nil
}

func (r *Record) delete(db *gorm.DB) error {
	if err := db.Delete(r).Error; err != nil {
		return err
	}

	return nil
}
