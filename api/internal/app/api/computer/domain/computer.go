package domain

import (
	"time"
  "gorm.io/gorm"
)

type Computer struct {
	gorm.Model
	ID           int            `gorm:"primary_key"`
	HostName     string         `gorm:"not null"`
	IPAddress    string         `gorm:"not null"`
	MACAddress   string         `gorm:"not null"`
  CreatedAt    time.Time
  UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
}
