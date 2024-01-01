package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"api/internal/app/api/ssh/usecase"
	"api/internal/app/api/ssh/dto/requests"
)

type SshKeyHandler interface {
	CreateSshKey(c *gin.Context)
}

type sshKeyHandler struct {
	sshKeyUseCase usecase.SshKeyUseCase
}

func NewSshKeyHandler(uc usecase.SshKeyUseCase) SshKeyHandler {
	return &sshKeyHandler{
		sshKeyUseCase: uc,
	}
}

func (h sshKeyHandler) CreateSshKey(c *gin.Context) {
	var request requests.CreateSshKeyRequests
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	publicKey, err := h.sshKeyUseCase.CreateSshKey(&request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": publicKey,
	})
}
