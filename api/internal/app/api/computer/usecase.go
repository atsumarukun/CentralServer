package computer

import (
	"api/internal/app/api/computer/domain"
	"api/internal/app/api/computer/domain/repository"
)

type ComputerUseCase interface {
	GetComputerById(id int) domain.Computer
}

type computerUseCase struct {
	computerRepository repository.ComputerRepository
}

func NewComputerUseCase(r repository.ComputerRepository) ComputerUseCase {
	return &computerUseCase{
		computerRepository: r,
	}
}

func (uc computerUseCase) GetComputerById(id int) domain.Computer {
	return uc.computerRepository.GetComputerById(id)
}
