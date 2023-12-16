package handler

import (
	"strconv"
	"net/http"
	"github.com/gin-gonic/gin"
	"api/internal/app/api/computer/usecase"
	"api/internal/app/api/computer/dto/requests"
)

type ComputerHandler interface {
	CreateComputer(c *gin.Context)
	UpdateComputer(c *gin.Context)
	DeleteComputer(c *gin.Context)
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

func (h computerHandler) CreateComputer(c *gin.Context) {
	var request requests.CreateComputerRequests
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.CreateComputer(&request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": computer,
	})
}

func (h computerHandler) UpdateComputer(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var request requests.UpdateComputerRequests
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.UpdateComputer(id, &request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": computer,
	})
}

func (h computerHandler) DeleteComputer(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.DeleteComputer(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": computer,
	})
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
