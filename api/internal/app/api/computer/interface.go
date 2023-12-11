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
	computer, err := h.computerUseCase.GetComputerById(1)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": computer,
	})
}
