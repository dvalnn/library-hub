package app

import (
	"context"
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

const _DATABASE_NAME string = "libraryHub-24-25.db"

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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Goodbye(name string) string {
	return fmt.Sprintf("Goodbye %s, sad to see you leave", name)
}

func (a *App) SearchStudent(name string) []*Student {
	students, err := studentSearchLoose(a.db, name)
	if err != nil {
		log.Printf("[App.SearchStudent] Error: %v", err)
	}
	return students
}
