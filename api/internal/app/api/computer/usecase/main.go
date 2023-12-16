package usecase

import (
	"api/internal/app/api/computer/domain/repository"
	"api/internal/app/api/computer/dto/requests"
	"api/internal/app/api/computer/dto/responses"
)

type ComputerUseCase interface {
	CreateComputer(request *requests.CreateComputerRequests) (*responses.ComputerResponses, error)
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

func (uc computerUseCase) CreateComputer(request *requests.CreateComputerRequests) (*responses.ComputerResponses, error) {
	computer := request.ToEntity()
	computer, err := uc.computerRepository.CreateComputer(computer)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}

func (uc computerUseCase) GetComputerById(id int) (*responses.ComputerResponses, error) {
	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}
