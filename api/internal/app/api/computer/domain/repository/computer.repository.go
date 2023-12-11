package repository

import (
	"api/internal/app/api/computer/domain"
)

type ComputerRepository interface {
	GetComputerById(id int) (*domain.Computer, error)
}
