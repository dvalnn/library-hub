package app

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Record struct {
	gorm.Model
	Activity Activity `gorm:"NotNull" json:"activity"`
	AgentID  uint     `gorm:"NotNull" json:"agent_id"`
	Agent    Agent    `json:"agent"`
}

// TODO: make this more robust. Look into how gorm handles fk references
func (r *Record) validate() error {
	allowedActivities, ok := AgentActivityMap[r.Agent.AgentKind]
	if !ok {
		return fmt.Errorf("invalid agent kind: %s", r.Agent.AgentKind)
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

//TODO: paginate the search and add a lower limit to the return
const _RECORD_MAX_SEARCH_HITS = 300

func recordSearchByDay(db *gorm.DB, day string) ([]*Record, error) {
	var records []*Record
	const query = "date(records.updated_at) = ? AND records.deleted_at IS NULL"
	err := db.Preload("Agent").Where(query, day).Find(&records).Limit(_RECORD_MAX_SEARCH_HITS).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no records for day %s", day)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	if len(records) == 0 {
		return nil, fmt.Errorf("no records for day %s: %w", day, gorm.ErrRecordNotFound)
	}

	return records, nil
}

func recordSearchByDayFiltered(db *gorm.DB, day string, filter AgentKind) ([]*Record, error) {
	var records []*Record
	const query = "date(records.updated_at) = ? AND agents.agent_kind = ? AND records.deleted_at IS NULL"
	const join = "JOIN agents ON records.agent_id = agents.id"
	err := db.Preload("Agent").Where(query, day, filter).Joins(join).Find(&records).Limit(_RECORD_MAX_SEARCH_HITS).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no records for %s for day %s", filter, day)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	if len(records) == 0 {
		return nil, fmt.Errorf("no %s records for day %s: %w", filter, day, gorm.ErrRecordNotFound)
	}

	return records, nil
}
