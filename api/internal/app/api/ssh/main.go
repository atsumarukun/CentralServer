package ssh

import (
	"github.com/gin-gonic/gin"
	"api/internal/app/api/ssh/infrastructure/persistence"
	"api/internal/app/api/ssh/usecase"
	"api/internal/app/api/ssh/interface/handler"
)

func AddSshRoutes(rg *gin.RouterGroup) {
	persistence := persistence.NewSshKeyPersistence()
	useCase := usecase.NewSshKeyUseCase(persistence)
	handler := handler.NewSshKeyHandler(useCase)

	ssh := rg.Group("/ssh/key")
	ssh.POST("/", handler.CreateSshKey)
	ssh.PUT("/:id", handler.UpdateSshKey)
	ssh.DELETE("/:id", handler.DeleteSshKey)
}