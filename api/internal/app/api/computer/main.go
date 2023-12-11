package computer

import (
	"github.com/gin-gonic/gin"
)

func AddComputerRoutes(rg *gin.RouterGroup) {
	infrastructure := NewComputerInfrastructure()
	useCase := NewComputerUseCase(infrastructure)
	handler := NewComputerHandler(useCase)

	computer := rg.Group("/computer")
	computer.GET("/", handler.GetComputerById)
}
