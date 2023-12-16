package usecase

import (
	"api/internal/app/api/computer/domain/entities"
	"api/internal/app/api/computer/domain/repository"
)

type ComputerUseCase interface {
	GetComputerById(id int) (*entities.Computer, error)
}

type computerUseCase struct {
	computerRepository repository.ComputerRepository
}

func NewComputerUseCase(r repository.ComputerRepository) ComputerUseCase {
	return &computerUseCase{
		computerRepository: r,
	}
}

func (uc computerUseCase) GetComputerById(id int) (*entities.Computer, error) {
	return uc.computerRepository.GetComputerById(id)
}
