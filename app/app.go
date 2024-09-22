package app

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db  *gorm.DB
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

var debugAgents = []Agent{
	{
		Model:         gorm.Model{},
		AgentKind:     STUDENT,
		Name:          "Charlie Bob Brown",
		Class:         "10A",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     TEACHER,
		Name:          "Abigail Bob Brown",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     ASSISTANT,
		Name:          "Robert Bob Cole",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     STUDENT,
		Name:          "Silvie Retriever",
		Class:         "8B",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     TEACHER,
		Name:          "Richard Hard",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     STUDENT,
		Name:          "Megan Marle Brown",
		Class:         "12C",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     STUDENT,
		Name:          "Coto Velo",
		Class:         "5A",
	},
	{
		Model:         gorm.Model{},
		AgentKind:     TEACHER,
		Name:          "Manu El",
		Class:         "",
	},
}

// const _DATABASE_NAME string = "libraryHub-24-25"
const _DATABASE_NAME string = "debug"

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	db, err := openSqliteDB(_DATABASE_NAME)
	if err != nil {
		log.Fatalf("could not open database: %v", err)
	}

	err = migrateDB(db)
	if err != nil {
		log.Fatalf("could not migrate database: %v", err)
	}

	for _, agent := range debugAgents {

		err = db.Where(
			&Agent{Name: agent.Name},
		).Attrs(&agent).FirstOrCreate(&agent).Error
		if err != nil {
			log.Fatalf("failed to insert test data: %v", err)
		}
	}

	a.ctx = ctx
	a.db = db
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func jsonString(matches []*Agent) (string, error) {
	bytes, err := json.Marshal(matches)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func (a *App) SearchAgent(name string, kind AgentKind) ([]*Agent, error) {
	if name == "" {
		return nil, nil
	}

	log.Printf("Searching for %s %s", name, kind)
	if kind == 0 {
		matches, err := agentNameSearch(a.db, name)
		if err != nil {
			return nil, err
		}
		return matches, nil
	}

	matches, err := agentNameSearch(a.db, name)
	if err != nil {
		return nil, err
	}
	log.Printf("%d matches found: %s\n\n", len(matches), matches)
	return matches, nil
}
