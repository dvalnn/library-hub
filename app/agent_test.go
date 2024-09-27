package app

import (
	"errors"
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect to the in-memory SQLite database: %v", err)
	}

	// Auto-migrate the Agent schema
	err = db.AutoMigrate(&Agent{})
	if err != nil {
		t.Fatalf("failed to migrate schema: %v", err)
	}

	// Insert some test data
	testStudents := []Agent{
		{
			Model:     gorm.Model{},
			AgentKind: STUDENT,
			Name:      "Charlie Bob Brown",
			Class:     "10A",
		},
		{
			Model:     gorm.Model{},
			AgentKind: TEACHER,
			Name:      "Abigail Bob Brown",
			Class:     "",
		},
		{
			Model:     gorm.Model{},
			AgentKind: ASSISTANT,
			Name:      "Robert Bob Cole",
			Class:     "",
		},
		{
			Model:     gorm.Model{},
			AgentKind: STUDENT,
			Name:      "Silvie Retriever",
			Class:     "8B",
		},
		{
			Model:     gorm.Model{},
			AgentKind: TEACHER,
			Name:      "Richard Hard",
			Class:     "",
		},
		{
			Model:     gorm.Model{},
			AgentKind: STUDENT,
			Name:      "Megan Markle Brown",
			Class:     "12C",
		},
	}

	err = db.Create(&testStudents).Error
	if err != nil {
		t.Fatalf("failed to insert test data: %v", err)
	}

	return db
}

func TestAgentSearchName(t *testing.T) {
	db := setupTestDB(t)

	t1TestName := "Bob"
	t1Expected := [...]string{"Charlie Bob Brown", "Abigail Bob Brown", "Robert Bob Cole"}

	// Test case: Students with similar name
	// Test case: Full name match (sequential names)
	t.Run("single name search match", func(t *testing.T) {
		matches, err := agentNameSearch(db, t1TestName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(matches) != len(t1Expected) {
			t.Fatalf("expected %d agents, got %d", len(t1Expected), len(matches))
		}
		for idx, match := range matches {
			if match.Name != t1Expected[idx] {
				t.Fatalf("expected %s name, got %s", t1Expected[idx], match.Name)
			}
		}
	})

	t2TestName := "Charlie Brown"
	t2Expected := [...]string{"Charlie Bob Brown"}

	t.Run("non sequential names search match", func(t *testing.T) {
		matches, err := agentNameSearch(db, t2TestName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(matches) != len(t2Expected) {
			t.Fatalf("expected %d agents, got %d", len(t2Expected), len(matches))
		}
		for idx, match := range matches {
			if match.Name != t2Expected[idx] {
				t.Fatalf("expected %s name, got %s", t2Expected[idx], match.Name)
			}
		}
	})

	t3TestName := "Unknown"
	t.Run(
		"invalid name",
		func(t *testing.T) {
			matches, err := agentNameSearch(db, t3TestName)
			if err == nil {
				if matches != nil {
					t.Errorf(
						"expected 'matches == nil' but got %d hits: '%s'",
						len(matches),
						func() string {
							var matchesStr string
							for _, match := range matches {
								matchesStr = matchesStr + match.String() + "\n"
							}
							return matchesStr
						}(),
					)
				}
				t.Fatalf("expected error '%v' but got none", gorm.ErrRecordNotFound)
			}
			if !errors.Is(err, gorm.ErrRecordNotFound) {
				t.Fatalf("expected error '%v' but got '%v'", gorm.ErrRecordNotFound, err)
			}
		},
	)
}

func TestAgentNameSearchFiltered(t *testing.T) {
	db := setupTestDB(t)

	t1TestName := "Bob"
	t1TestKind := STUDENT
	t1Expected := [...]string{"Charlie Bob Brown"}

	// Test case: Students with similar name
	// Test case: Full name match (sequential names)
	t.Run("single name search match", func(t *testing.T) {
		matches, err := agentNameSearchFiltered(db, t1TestName, t1TestKind)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(matches) != len(t1Expected) {
			t.Fatalf("expected %d agents, got %d", len(t1Expected), len(matches))
		}
		for idx, match := range matches {
			if match.Name != t1Expected[idx] {
				t.Fatalf("expected %s name, got %s", t1Expected[idx], match.Name)
			}
		}
	})
}
