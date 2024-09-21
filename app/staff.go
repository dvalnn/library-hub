package app

type StaffType uint

const (
	// Enum index 0 is "Undefined"
	Teacher      StaffType = iota + 1 // Enum index 1
	GeneralStaff                      // Enum index 2
)

func (s StaffType) String() string {
	return [...]string{
		"Undefined",
		"Teacher",
		"Assistant",
	}[s]
}

type Staff struct {
	Name          string    `gorm:"NotNull;Unique" json:"name"           validate:"nonzero"`
	Type          StaffType `gorm:"NotNull"        json:"type"           validate:"min=1"`
	ProcessNumber uint      `gorm:"PrimaryKey"     json:"process_number" validate:"min=1"`
}
