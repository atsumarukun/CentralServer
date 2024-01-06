package responses

import (
	"time"
	"api/internal/app/api/ssh/domain/entities"
)

type SshKeyResponse struct {
	ID           int            `json:"id"`
	UserName     string         `json:"user_name"`
	Port         int            `json:"port"`
  CreatedAt    time.Time      `json:"created_at"`
  UpdatedAt    time.Time      `json:"updated_at"`
	ComputerID   int            `json:"computer_id"`
}

func FromEntity(sshKey *entities.SshKey) *SshKeyResponse {
	return &SshKeyResponse{
		ID: sshKey.ID,
		UserName: sshKey.UserName,
		Port: sshKey.Port,
		CreatedAt: sshKey.CreatedAt,
		UpdatedAt: sshKey.UpdatedAt,
		ComputerID: sshKey.ComputerID,
	}
}

func FromEntities(sshKeys []entities.SshKey) []SshKeyResponse {
	response := []SshKeyResponse{}
	for _, sshkey := range sshKeys {
		response = append(response, *FromEntity(&sshkey))
	}
	return response
}
