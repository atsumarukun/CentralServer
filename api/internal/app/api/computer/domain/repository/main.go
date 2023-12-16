package repository

import (
	"api/internal/app/api/computer/domain/entities"
)

type ComputerRepository interface {
	CreateComputer(computer *entities.Computer) (*entities.Computer, error)
	UpdateComputer(computer *entities.Computer) (*entities.Computer, error)
	GetComputerById(id int) (*entities.Computer, error)
}
