package handler

import (
	"strconv"
	"net/http"
	"github.com/gin-gonic/gin"
	"api/internal/app/api/computer/usecase"
)

type ComputerHandler interface {
	GetComputerById(c *gin.Context)
}

type computerHandler struct {
	computerUseCase usecase.ComputerUseCase
}

func NewComputerHandler(uc usecase.ComputerUseCase) ComputerHandler {
	return &computerHandler{
		computerUseCase: uc,
	}
}

func (h computerHandler) GetComputerById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.GetComputerById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": computer,
	})
}
