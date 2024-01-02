package entities

import (
	"time"
  "gorm.io/gorm"
)

type SshKey struct {
	gorm.Model
	ID           int            `gorm:"primary_key"`
	UserName     string         `gorm:"not null;uniqueIndex:idx_member"`
	PrivateKey   string         `gorm:"not null"`
  CreatedAt    time.Time
  UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	ComputerID   int            `gorm:"not null;uniqueIndex:idx_member"`
}
