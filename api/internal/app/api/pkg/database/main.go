package database

import (
	"fmt"
  "gorm.io/gorm"
	"gorm.io/driver/postgres"
	"api/internal/app/api/pkg/conf"
	"api/internal/app/api/computer/domain"
)

var (
	DB *gorm.DB
)

func Connect() {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d TimeZone=%s",
		conf.DatabaseHost,
		conf.DatabaseUser,
		conf.DatabasePassword,
		conf.DatabaseName,
		conf.DatabasePort,
		conf.DatabaseTimezone,
	)
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database.")
	}

	DB.AutoMigrate(&domain.Computer{})
}
