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
	computer.GET("/", handler.GetComputerAll)
	computer.POST("/", handler.CreateComputer)
	computer.GET("/:id", handler.GetComputerById)
	computer.PUT("/:id", handler.UpdateComputer)
	computer.DELETE("/:id", handler.DeleteComputer)
	computer.PUT("/:id/wol", handler.WakeOnLanComputer)
	computer.PUT("/:id/reboot", handler.RebootComputer)
}
