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
		ProcessNumber: 1,
		AgentKind:     STUDENT,
		Name:          "Charlie Bob Brown",
		Class:         "10A",
	},
	{
		Model:         gorm.Model{},
		ProcessNumber: 2,
		AgentKind:     TEACHER,
		Name:          "Abigail Bob Brown",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		ProcessNumber: 3,
		AgentKind:     ASSISTANT,
		Name:          "Robert Bob Cole",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		ProcessNumber: 4,
		AgentKind:     STUDENT,
		Name:          "Silvie Retriever",
		Class:         "8B",
	},
	{
		Model:         gorm.Model{},
		ProcessNumber: 5,
		AgentKind:     TEACHER,
		Name:          "Richard Hard",
		Class:         "",
	},
	{
		Model:         gorm.Model{},
		ProcessNumber: 6,
		AgentKind:     STUDENT,
		Name:          "Megan Marle Brown",
		Class:         "12C",
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

	err = db.Create(&debugAgents).Error
	if err != nil {
		log.Fatalf("failed to insert test data: %v", err)
	}

	a.ctx = ctx
	a.db = db
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SearchAgent(name string, ind AgentKind) ([]byte, error) {
	if kind == 0 {
		matches, err := agentNameSearch(a.db, name)
		if err != nil {
			return nil, err
		}
		return json.Marshal(matches)
	}

	matches, err := agentNameSearch(a.db, name)
	if err != nil {
		return nil, err
	}
	return json.Marshal(matches)
}
