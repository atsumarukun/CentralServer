package usecase

import (
	"api/internal/app/api/computer/domain"
	"api/internal/app/api/computer/domain/repository"
)

type ComputerUseCase interface {
	GetComputerById(id int) (*domain.Computer, error)
}

type computerUseCase struct {
	computerRepository repository.ComputerRepository
}

func NewComputerUseCase(r repository.ComputerRepository) ComputerUseCase {
	return &computerUseCase{
		computerRepository: r,
	}
}

func (uc computerUseCase) GetComputerById(id int) (*domain.Computer, error) {
	return uc.computerRepository.GetComputerById(id)
}
