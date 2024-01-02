package persistence

import (
	"api/internal/app/api/pkg/database"
	"api/internal/app/api/ssh/domain/entities"
	"api/internal/app/api/ssh/domain/repository"
)

type sshKeyPersistence struct{}

func NewSshKeyPersistence() repository.SshKeyRepository {
	return &sshKeyPersistence{}
}

func (_ sshKeyPersistence) CreateSshKey(sshKey *entities.SshKey) (*entities.SshKey, error) {
	if err := database.DB.Create(sshKey).Error; err != nil {
		return nil, err
	}
	return sshKey, nil
}

func (_ sshKeyPersistence) DeleteSshKey(sshKey *entities.SshKey) (*entities.SshKey, error) {
	if err := database.DB.Unscoped().Delete(sshKey).Error; err != nil {
		return nil, err
	}
	return sshKey, nil
}

func (_ sshKeyPersistence) GetSshKeyById(id int) (*entities.SshKey, error) {
	var sshKey entities.SshKey
	if err := database.DB.First(&sshKey, id).Error; err != nil {
		return nil, err
	}
	return &sshKey, nil
}
