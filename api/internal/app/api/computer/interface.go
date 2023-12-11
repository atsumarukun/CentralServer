package computer

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type ComputerHandler interface {
	GetComputerById(c *gin.Context)
}

type computerHandler struct {
	computerUseCase ComputerUseCase
}

func NewComputerHandler(uc ComputerUseCase) ComputerHandler {
	return &computerHandler{
		computerUseCase: uc,
	}
}

func (h computerHandler) GetComputerById(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": h.computerUseCase.GetComputerById(1),
	})
}
