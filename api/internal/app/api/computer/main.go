package computer

import (
	"github.com/gin-gonic/gin"
	"api/internal/app/api/computer/infrastructure/persistence"
	"api/internal/app/api/computer/usecase"
	"api/internal/app/api/computer/interface/handler"
)

func AddComputerRoutes(rg *gin.RouterGroup) {
	persistence := persistence.NewComputerPersistence()
	useCase := usecase.NewComputerUseCase(persistence)
	handler := handler.NewComputerHandler(useCase)

	computer := rg.Group("/computer")
	computer.POST("/", handler.CreateComputer)
	computer.GET("/:id", handler.GetComputerById)
	computer.PUT("/:id", handler.UpdateComputer)
}
