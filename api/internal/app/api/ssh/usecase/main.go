package usecase

import (
	"strings"
	"api/internal/app/api/ssh/domain/repository"
	"api/internal/app/api/ssh/dto/requests"
	"api/internal/app/api/ssh/dto/responses"
	"api/internal/app/api/ssh/pkg/crypto"
)

type SshKeyUseCase interface {
	CreateSshKey(request *requests.CreateSshKeyRequests) (string, error)
	DeleteSshKey(id int) (*responses.SshKeyResponse, error)
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

func (uc sshKeyUseCase) DeleteSshKey(id int) (*responses.SshKeyResponse, error) {
	sshKey, err := uc.sshKeyRepository.GetSshKeyById(id)
	if err != nil {
		return nil, err
	}

	sshKey, err = uc.sshKeyRepository.DeleteSshKey(sshKey)
	if err != nil {
		return nil, err
	}
	return responses.FromEntity(sshKey), nil
}
