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

	// Auto-migrate the Student schema
	err = db.AutoMigrate(&Student{})
	if err != nil {
		t.Fatalf("failed to migrate schema: %v", err)
	}

	// Insert some test data
	testStudents := []Student{
		{Name: "Alice Megan Johnson", Class: "10A", ProcessNumber: 1},
		{Name: "Bob Bob Smith", Class: "10B", ProcessNumber: 2},
		{Name: "Charlie Bob Brown", Class: "10A", ProcessNumber: 3},
	}

	err = db.Create(&testStudents).Error
	if err != nil {
		t.Fatalf("failed to insert test data: %v", err)
	}

	return db
}

func TestStudentSearchExact(t *testing.T) {
	db := setupTestDB(t)

	expected := "Alice Megan Johnson"
	// Test case: Existing student
	t.Run("valid student by full name", func(t *testing.T) {
		student, err := studentSearchExact(db, expected)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if student.Name != expected {
			t.Errorf("expected name '%s', got '%s'", expected, student.Name)
		}
	})

	// Test case: Non-existent student
	t.Run("non-existent student", func(t *testing.T) {
		student, err := studentSearchExact(db, "Unknown")
		if !errors.Is(err, gorm.ErrRecordNotFound) && student != nil {
			t.Fatalf("expected no students found, got: %v", err)
		}
	})
}

func TestStudentSearchLoose(t *testing.T) {
	db := setupTestDB(t)

	t1TestName := "Bob"
	t1Expected := [...]string{"Bob Bob Smith", "Charlie Bob Brown"}

	// Test case: Students with similar name
	// Test case: Full name match (sequential names)
	t.Run("single name search match", func(t *testing.T) {
		students, err := studentSearchLoose(db, t1TestName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(students) != len(t1Expected) {
			t.Fatalf("expected %d students, got %d", len(t1Expected), len(students))
		}
		for idx, student := range students {
			if student.Name != t1Expected[idx] {
				t.Fatalf("expected %s name, got %s", t1Expected[idx], student.Name)
			}
		}
	})

	t2TestName := "Charlie Brown"
	t2Expected := [...]string{"Charlie Bob Brown"}

	// Test case: Students with similar name
	// Test case: Full name match (sequential names)
	t.Run("non sequential names search match", func(t *testing.T) {
		students, err := studentSearchLoose(db, t2TestName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(students) != len(t2Expected) {
			t.Fatalf("expected %d students, got %d", len(t2Expected), len(students))
		}
		for idx, student := range students {
			if student.Name != t2Expected[idx] {
				t.Fatalf("expected %s name, got %s", t2Expected[idx], student.Name)
			}
		}
	})

	t3TestName := "Unknown"
	// Test case: Students with similar name
	// Test case: Full name match (sequential names)
	t.Run(
		"invalid name",
		func(t *testing.T) {
			students, err := studentSearchLoose(db, t3TestName)
			if err == nil {
				if students != nil {
					t.Errorf(
						"expected 'students == nil' but got %d hits: '%s'",
						len(students),
						func() string {
							var studentsStr string
							for _, student := range students {
								studentsStr = studentsStr + student.String() + "\n"
							}
							return studentsStr
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
