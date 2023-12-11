package computer

import (
	"api/internal/app/api/computer/domain"
	"api/internal/app/api/computer/domain/repository"
)

type computerInfrastructure struct{}

func NewComputerInfrastructure() repository.ComputerRepository {
	return &computerInfrastructure{}
}

func (_ computerInfrastructure) GetComputerById(id int) domain.Computer {
	return domain.Computer{
		ID: id,
		HostName: "test",
		IPAddress: "0.0.0.0",
		MACAddress: "00:00:00:00:00:00",
	}
}
