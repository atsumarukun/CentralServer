package persistence

import (
	"api/internal/app/api/pkg/database"
	"api/internal/app/api/computer/domain"
	"api/internal/app/api/computer/domain/repository"
)

type computerPersistence struct{}

func NewComputerPersistence() repository.ComputerRepository {
	return &computerPersistence{}
}

func (_ computerPersistence) GetComputerById(id int) (*domain.Computer, error) {
	var computer domain.Computer
	if err := database.DB.First(&computer, id).Error; err != nil {
		return nil, err
	}
	return &computer, nil
}
