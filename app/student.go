package app

import (
	"errors"
	"fmt"
	"strings"

	"gorm.io/gorm"
)

type Student struct {
	Name          string `gorm:"Unique;NotNull" json:"name"           validate:"nonzero"`
	Class         string `gorm:"NotNull"        json:"class"          validate:"nonzero"`
	ProcessNumber uint   `gorm:"PrimaryKey"     json:"process_number" validate:"min=0"`
}

func (s *Student) String() string {
	return fmt.Sprintf(
		"Name: %s | Class: %s | ProcessNumber: %d",
		s.Name,
		s.Class,
		s.ProcessNumber,
	)
}

func (s *Student) insert(db *gorm.DB) error {
	err := db.Create(s).Error
	if err != nil {
		return err
	}

	return nil
}

func (s *Student) delete(db *gorm.DB) error {
	err := db.Delete(s).Error
	if err != nil {
		return err
	}

	return nil
}

func studentSearchExact(db *gorm.DB, name string) (*Student, error) {
	if name == "" {
		return nil, fmt.Errorf("name search is empty string")
	}

	var student Student
	err := db.Where("name = ?", name).First(&student).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no exact match for %s: %w", name, err)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	return &student, nil
}

const _STUDENT_MAX_NAME_LIKE = 20

func studentSearchLoose(db *gorm.DB, name string) ([]*Student, error) {
	if name == "" {
		return nil, fmt.Errorf("name search is empty string")
	}

	// Handle non-sequential name search (ex: search for first + last name)
	nameTokens := strings.Split(name, " ")
	nameSearchStr := "%" + strings.Join(nameTokens, "%") + "%"

	var students []*Student
	err := db.Where("name LIKE ?", nameSearchStr).Find(&students).Limit(_STUDENT_MAX_NAME_LIKE).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no loose match for '%s': %w", name, err)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	if len(students) == 0 {
		return nil, fmt.Errorf("no loose match for '%s': %w", name, gorm.ErrRecordNotFound)
	}

	return students, nil
}
