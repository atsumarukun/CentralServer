package responses

import (
	"time"
	"api/internal/app/api/computer/domain/entities"
)

type ComputerResponses struct {
	ID           int       `json:"id"`
	HostName     string    `json:"host_name"`
	IPAddress    string    `json:"ip_address"`
	MACAddress   string    `json:"mac_address"`
  CreatedAt    time.Time `json:"created_at"`
  UpdatedAt    time.Time `json:"updated_at"`
}

func FromEntity(computer *entities.Computer) *ComputerResponses {
	return &ComputerResponses{
		ID: computer.ID,
		HostName: computer.HostName,
		IPAddress: computer.IPAddress,
		MACAddress: computer.MACAddress,
		CreatedAt: computer.CreatedAt,
		UpdatedAt: computer.UpdatedAt,
	}
}

func FromEntities(computers []entities.Computer) []ComputerResponses {
	var response []ComputerResponses
	for _, computer := range computers {
		response = append(response, *FromEntity(&computer))
	}
	return response
}
