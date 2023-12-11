package pkg

import (
  "gorm.io/gorm"
	"gorm.io/driver/postgres"
	"api/internal/app/api/computer/domain"
)

func ConnectDataBase() {
	dsn := "host=db user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=UTC"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database.")
	}
	db.AutoMigrate(&domain.Computer{})
}
