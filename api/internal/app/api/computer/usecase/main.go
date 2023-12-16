package usecase

import (
	"api/internal/app/api/computer/domain/repository"
	"api/internal/app/api/computer/dto/responses"
)

type ComputerUseCase interface {
	GetComputerById(id int) (*responses.ComputerResponses, error)
}

type computerUseCase struct {
	computerRepository repository.ComputerRepository
}

func NewComputerUseCase(r repository.ComputerRepository) ComputerUseCase {
	return &computerUseCase{
		computerRepository: r,
	}
}

func (uc computerUseCase) GetComputerById(id int) (*responses.ComputerResponses, error) {
	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}
