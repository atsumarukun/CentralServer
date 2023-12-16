package requests

import (
	"api/internal/app/api/computer/domain/entities"
)

type CreateComputerRequests struct {
	HostName   string `json:"host_name"`
	IPAddress  string `json:"ip_address"`
	MACAddress string `json:"mac_address"`
}

func (r *CreateComputerRequests) ToEntity() *entities.Computer {
	return &entities.Computer{
		HostName: r.HostName,
		IPAddress: r.IPAddress,
		MACAddress: r.MACAddress,
	}
}
