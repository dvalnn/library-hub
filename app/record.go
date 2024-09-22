package app

import "gorm.io/gorm"

type Record struct {
	gorm.Model
	Event   Activity `gorm:"NotNull" json:"event"`
	AgentID int      `gorm:"NotNull" json:"agent_id"`
	Agent   Agent
}

func (r *Record) create(db *gorm.DB) error {
	err := db.Create(r).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *Record) delete(db *gorm.DB) error {
	err := db.Delete(r).Error
	if err != nil {
		return err
	}

	return nil
}
