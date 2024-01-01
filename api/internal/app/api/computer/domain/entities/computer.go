package entities

import (
	"time"
  "gorm.io/gorm"
	"api/internal/app/api/ssh/domain/entities"
)

type Computer struct {
	gorm.Model
	ID           int            `gorm:"primary_key"`
	HostName     string         `gorm:"not null"`
	IPAddress    string         `gorm:"not null"`
	MACAddress   string         `gorm:"not null"`
	SshKeys      []entities.SshKey
  CreatedAt    time.Time
  UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
}
