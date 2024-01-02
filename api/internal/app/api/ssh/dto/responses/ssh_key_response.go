package responses

import (
	"time"
	"api/internal/app/api/ssh/domain/entities"
)

type SshKeyResponse struct {
	ID           int            `gorm:"primary_key"`
	UserName     string         `gorm:"not null"`
  CreatedAt    time.Time
  UpdatedAt    time.Time
	ComputerID   int            `gorm:"not null"`
}

func FromEntity(sshKey *entities.SshKey) *SshKeyResponse {
	return &SshKeyResponse{
		ID: sshKey.ID,
		UserName: sshKey.UserName,
		CreatedAt: sshKey.CreatedAt,
		UpdatedAt: sshKey.UpdatedAt,
		ComputerID: sshKey.ComputerID,
	}
}

func FromEntities(sshKeys []entities.SshKey) []SshKeyResponse {
	var response []SshKeyResponse
	for _, sshkey := range sshKeys {
		response = append(response, *FromEntity(&sshkey))
	}
	return response
}
