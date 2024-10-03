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

var debugAgents = []Agent{
	{
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob Richard Hard",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: STUDENT,
		Name:      "Megan Marle Brown Bob",
		Class:     "12C",
	}, {
		Model:     gorm.Model{},
		AgentKind: STUDENT,
		Name:      "Bob Coto Velo",
		Class:     "5A",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob Manu El",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob O Construtor",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: STUDENT,
		Name:      "Bob O Aprendiz",
		Class:     "12C",
	}, {
		Model:     gorm.Model{},
		AgentKind: ASSISTANT,
		Name:      "Bob O Serralheiro",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob O Bob",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob O Canalizador",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob O Professor",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: STUDENT,
		Name:      "Bob Esponja",
		Class:     "12A",
	}, {
		Model:     gorm.Model{},
		AgentKind: ASSISTANT,
		Name:      "Bob O Cozinheiro",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Bob O Ditador",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Mario Bob",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Luigi Bob",
		Class:     "",
	}, {
		Model:     gorm.Model{},
		AgentKind: TEACHER,
		Name:      "Peach Bob",
		Class:     "",
	},
}

const _DATABASE_NAME string = "libraryHub-24-25"

// const _DATABASE_NAME string = "debug"

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

	matches, err := agentNameSearchFiltered(a.db, name, kind)
	if err != nil {
		return nil, err
	}
	log.Printf("%d matches found: %s\n\n", len(matches), matches)
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

// TODO: add record verification (maybe accept an ID, search and then delete)
func (a *App) DeleteRecord(r *Record) error {
	return r.delete(a.db)
}
