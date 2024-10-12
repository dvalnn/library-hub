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

const _RECORD_MAX_SEARCH_HITS = 200

func recordSearchByDay(db *gorm.DB, day string) ([]*Record, error) {
	var records []*Record
	err := db.Where("date(updated_at) = '?' AND deleted_at IS NULL", day).Find(&records).Limit(_RECORD_MAX_SEARCH_HITS).Error
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
	const query = "date(updated_at) = '?' AND deleted_at IS NULL"
	err := db.Where(query, day).Preload("agents", "agent_kind = ?", filter).Find(&records).Limit(_RECORD_MAX_SEARCH_HITS).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no records for %s for day %s", filter, day)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	if len(records) == 0 {
		return nil, fmt.Errorf("no records for %s for day %s: %w", filter, day, gorm.ErrRecordNotFound)
	}

	return records, nil
}
