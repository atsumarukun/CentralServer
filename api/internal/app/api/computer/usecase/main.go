package usecase

import (
	"api/internal/app/api/computer/domain/repository"
	"api/internal/app/api/computer/dto/requests"
	"api/internal/app/api/computer/dto/responses"
	"api/internal/app/api/pkg/wol"
	"api/internal/app/api/pkg/ping"
)

type ComputerUseCase interface {
	CreateComputer(request *requests.CreateComputerRequests) (*responses.ComputerResponse, error)
	UpdateComputer(id int, request *requests.UpdateComputerRequests) (*responses.ComputerResponse, error)
	DeleteComputer(id int) (*responses.ComputerResponse, error)
	WakeOnLanComputer(id int) (*responses.ComputerResponse, error)
	GetComputerAll() ([]responses.ComputerResponse, error)
	GetComputerById(id int) (*responses.ComputerResponse, error)
}

type computerUseCase struct {
	computerRepository repository.ComputerRepository
}

func NewComputerUseCase(r repository.ComputerRepository) ComputerUseCase {
	return &computerUseCase{
		computerRepository: r,
	}
}

func (uc computerUseCase) CreateComputer(request *requests.CreateComputerRequests) (*responses.ComputerResponse, error) {
	if err := request.Validate(); err != nil {
		return nil, err
	}

	computer := request.ToEntity()
	computer, err := uc.computerRepository.CreateComputer(computer)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}

func (uc computerUseCase) UpdateComputer(id int, request *requests.UpdateComputerRequests) (*responses.ComputerResponse, error) {
	if err := request.Validate(); err != nil {
		return nil, err
	}

	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}

	computer = request.ToEntity(computer)
	computer, err = uc.computerRepository.UpdateComputer(computer)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}

func (uc computerUseCase) DeleteComputer(id int) (*responses.ComputerResponse, error) {
	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}

	computer, err = uc.computerRepository.DeleteComputer(computer)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(computer), nil
}

func (uc computerUseCase) WakeOnLanComputer(id int) (*responses.ComputerResponse, error) {
	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}

	if err = wol.WakeOnLan(computer.IPAddress, computer.MACAddress); err != nil {
		return nil, err
	}

	return responses.FromEntity(computer), nil
}

func (uc computerUseCase) GetComputerAll() ([]responses.ComputerResponse, error) {
	computers, err := uc.computerRepository.GetComputerAll()
	if err != nil {
		return nil, err
	}

	response := responses.FromEntities(computers)
	for i := 0; i < len(response); i++ {
		statistics, err := ping.Send(response[i].IPAddress)
		if err != nil {
			return nil, err
		}
		running := statistics.PacketsRecv == statistics.PacketsSent

		response[i].Running = &running
	}
	return response, nil
}

func (uc computerUseCase) GetComputerById(id int) (*responses.ComputerResponse, error) {
	computer, err := uc.computerRepository.GetComputerById(id)
	if err != nil {
		return nil, err
	}

	statistics, err := ping.Send(computer.IPAddress)
	if err != nil {
		return nil, err
	}
	running := statistics.PacketsRecv == statistics.PacketsSent

	response := responses.FromEntity(computer)
	response.Running = &running
	return response, nil
}
