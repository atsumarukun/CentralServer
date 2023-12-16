package repository

import (
	"api/internal/app/api/computer/domain/entities"
)

type ComputerRepository interface {
	GetComputerById(id int) (*entities.Computer, error)
}
