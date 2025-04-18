package app

import (
	"errors"
	"fmt"
	"regexp"
	"strings"

	"gorm.io/gorm"
)

type AgentKind uint

const (
	STUDENT AgentKind = iota + 1
	TEACHER
	ASSISTANT

	AGENT_KIND_MAX
)

func (a AgentKind) String() string {
	return [...]string{
		"Undefined",
		"student",
		"teacher",
		"assistant",
	}[a]
}

type Agent struct {
	gorm.Model
	AgentKind AgentKind `gorm:"NotNull"        json:"agent_kind"     validate:"min=1"`
	Name      string    `gorm:"NotNull;Unique" json:"name"           validate:"nonzero"`
	Class     string    `                      json:"class"`
}

func (ag Agent) String() string {
	return fmt.Sprintf(
		`agent kind: %s, name: %s, class %s`,
		ag.AgentKind,
		ag.Name,
		ag.Class,
	)
}

// Validate the string based on the regex pattern
func (ag *Agent) validateClass() error {
	// Define the regex pattern
	pattern := `^(5|6|7|8|9|10|11|12)[A-Z]{1,2}$`

	// Compile the regex
	re := regexp.MustCompile(pattern)

	// Match the input string against the regex
	if !re.MatchString(ag.Class) {
		return fmt.Errorf("malformed class string")
	}

	return nil
}

func (ag *Agent) validate() error {
	if ag.Name == "" {
		return fmt.Errorf("name cannot be empty")
	}

	if ag.AgentKind <= 0 || ag.AgentKind > AGENT_KIND_MAX {
		return fmt.Errorf("agent kind must be between %d and %d", STUDENT, AGENT_KIND_MAX)
	}

	if ag.Class != "" {
		if ag.AgentKind != STUDENT {
			return fmt.Errorf("only students can be assigned to a class")
		}

		return ag.validateClass()
	}
	if ag.Class == "" && ag.AgentKind == STUDENT {
		return fmt.Errorf("students must be assigned to a class")
	}
	return nil
}

func (ag *Agent) Create(db *gorm.DB) error {
	err := ag.validate()
	if err != nil {
		return err
	}

	err = db.Create(ag).Error
	if err != nil {
		return err
	}

	return nil
}

const _AGENT_MAX_SEARCH_HITS = 50

func agentSearch(db *gorm.DB, queryStr string, queryArgs ...any) ([]*Agent, error) {
	var matches []*Agent
	err := db.Where(queryStr, queryArgs...).Find(&matches).Limit(_AGENT_MAX_SEARCH_HITS).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("no match for '%s': %w", queryStr, err)
		}
		return nil, fmt.Errorf("internal server error: %w", err)
	}

	if len(matches) == 0 {
		return nil, fmt.Errorf("no match for '%s': %w", queryStr, gorm.ErrRecordNotFound)
	}

	return matches, nil
}

func agentNameSearch(db *gorm.DB, name string) ([]*Agent, error) {
	nameTokens := strings.Split(name, " ")
	nameSearchStr := "%" + strings.Join(nameTokens, "%") + "%"
	return agentSearch(db, "name LIKE ?", nameSearchStr)
}

func agentNameSearchFiltered(db *gorm.DB, name string, kind AgentKind) ([]*Agent, error) {
	nameTokens := strings.Split(name, " ")
	nameSearchStr := "%" + strings.Join(nameTokens, "%") + "%"
	return agentSearch(db, "name LIKE ? AND agent_kind = ?", nameSearchStr, kind)
}

func agentClassSearch(db *gorm.DB, class string) ([]*Agent, error) {
	return agentSearch(db, "class = ?", class)
}
