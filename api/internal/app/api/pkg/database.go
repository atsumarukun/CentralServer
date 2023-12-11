package pkg

import (
  "gorm.io/gorm"
	"gorm.io/driver/postgres"
	"api/internal/app/api/computer/domain"
)

var (
	DB *gorm.DB
)

func ConnectDataBase() {
	dsn := "host=db user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=UTC"
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database.")
	}
	DB.AutoMigrate(&domain.Computer{})
}
