package app

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const SQLITE_DB_DIR = "./"
const SQLITE_DB_FILE_EXT = ".db"

func openSqliteDB(name string) (*gorm.DB, error) {
	var dbName string
	if name == "" {
		dbName = ":memory:"
	} else {
		dbName = SQLITE_DB_DIR + name + SQLITE_DB_FILE_EXT
	}

	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func migrateDB(db *gorm.DB) error {
	err := db.AutoMigrate(&Agent{}, &Record{})
	if err != nil {
		return err
	}

	return nil
}
