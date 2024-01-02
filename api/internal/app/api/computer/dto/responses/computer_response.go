package responses

import (
	"time"
	"api/internal/app/api/computer/domain/entities"
	sshKeyResponse "api/internal/app/api/ssh/dto/responses"
)

type ComputerResponse struct {
	ID           int                             `json:"id"`
	HostName     string                          `json:"host_name"`
	IPAddress    string                          `json:"ip_address"`
	MACAddress   string                          `json:"mac_address"`
	Running      *bool                           `json:"running"`
  CreatedAt    time.Time                       `json:"created_at"`
  UpdatedAt    time.Time                       `json:"updated_at"`
	SshKeys      []sshKeyResponse.SshKeyResponse `json:"ssh_keys"`
}

func FromEntity(computer *entities.Computer) *ComputerResponse {
	return &ComputerResponse{
		ID: computer.ID,
		HostName: computer.HostName,
		IPAddress: computer.IPAddress,
		MACAddress: computer.MACAddress,
		CreatedAt: computer.CreatedAt,
		UpdatedAt: computer.UpdatedAt,
		SshKeys: sshKeyResponse.FromEntities(computer.SshKeys),
	}
}

func FromEntities(computers []entities.Computer) []ComputerResponse {
	var response []ComputerResponse
	for _, computer := range computers {
		response = append(response, *FromEntity(&computer))
	}
	return response
}
