package repository

import (
	"api/internal/app/api/ssh/domain/entities"
)

type SshKeyRepository interface {
	CreateSshKey(sshKey *entities.SshKey) (*entities.SshKey, error)
	DeleteSshKey(sshKey *entities.SshKey) (*entities.SshKey, error)
	GetSshKeyById(id int) (*entities.SshKey, error)
}
