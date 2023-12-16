package persistence

import (
	"api/internal/app/api/pkg/database"
	"api/internal/app/api/computer/domain/entities"
	"api/internal/app/api/computer/domain/repository"
)

type computerPersistence struct{}

func NewComputerPersistence() repository.ComputerRepository {
	return &computerPersistence{}
}

func (_ computerPersistence) GetComputerById(id int) (*entities.Computer, error) {
	var computer entities.Computer
	if err := database.DB.First(&computer, id).Error; err != nil {
		return nil, err
	}
	return &computer, nil
}
