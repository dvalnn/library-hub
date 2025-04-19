package app

import (
	"context"
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

const _DATABASE_NAME string = "libraryHub-24-25"

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

	a.ctx = ctx
	a.db = db
}

func (a *App) SearchAgent(name string, kind AgentKind) ([]*Agent, error) {
	if name == "" {
		return nil, nil
	}

	if kind == 0 {
		matches, err := agentNameSearch(a.db, name)
		if err != nil {
			return nil, err
		}
		return matches, nil
	}

	matches, err := agentNameSearchFiltered(a.db, name, kind)
	if err != nil {
		return nil, err
	}

	return matches, nil
}

func (a *App) SearchByClass(class string) ([]*Agent, error) {
	matches, err := agentClassSearch(a.db, class)
	if err != nil {
		return nil, err
	}
	return matches, nil
}

func (a *App) CreateRecord(r *Record) (*Record, error) {
	if err := r.create(a.db); err != nil {
		return nil, err
	}
	return r, nil
}

func (a *App) DeleteRecord(r *Record) error {
	return r.delete(a.db)
}

func (a *App) SearchRecordsByDay(day string, kind AgentKind) ([]*Record, error) {
	if day == "" {
		return nil, nil
	}

	if kind == 0 {
		matches, err := recordSearchByDay(a.db, day)
		if err != nil {
			return nil, err
		}
		return matches, nil
	}

	matches, err := recordSearchByDayFiltered(a.db, day, kind)
	if err != nil {
		return nil, err
	}

	return matches, nil
}

func (a *App) CreateNewAgent(ag *Agent) error {

	println("Creating agent:", ag)
	println("Agent kind:", ag.AgentKind)
	println("Agent class:", ag.Class)
	println("Agent name:", ag.Name)

	if err := ag.Create(a.db); err != nil {
		println("Error creating agent:", err)
		return err
	}
	return nil
}
