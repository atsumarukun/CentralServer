package usecase

import (
	"strings"
	"api/internal/app/api/ssh/domain/repository"
	"api/internal/app/api/ssh/dto/requests"
	"api/internal/app/api/ssh/pkg/crypto"
)

type SshKeyUseCase interface {
	CreateSshKey(request *requests.CreateSshKeyRequests) (string, error)
}

type sshKeyUseCase struct {
	sshKeyRepository repository.SshKeyRepository
}

func NewSshKeyUseCase(r repository.SshKeyRepository) SshKeyUseCase {
	return &sshKeyUseCase{
		sshKeyRepository: r,
	}
}

func (uc sshKeyUseCase) CreateSshKey(request *requests.CreateSshKeyRequests) (string, error) {
	if err := request.Validate(); err != nil {
		return "", err
	}

	sshKeyPair, err := crypto.SshKeyGen()
	if err != nil {
		return "", err
	}

	sshKey := request.ToEntity()
	sshKey.PrivateKey = sshKeyPair.PrivateKey
	sshKey, err = uc.sshKeyRepository.CreateSshKey(sshKey)
	if err != nil {
		return "", err
	}

	return strings.Replace(sshKeyPair.PublicKey, "\n", "", 1), nil
}
