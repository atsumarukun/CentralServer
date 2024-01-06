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
	WakeOnLanComputer(c *gin.Context)
	RebootComputer(c *gin.Context)
	GetComputerAll(c *gin.Context)
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
	var request requests.CreateComputerRequest
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
		"data": computer,
	})
}

func (h computerHandler) UpdateComputer(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var request requests.UpdateComputerRequest
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
		"data": computer,
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
		"data": computer,
	})
}

func (h computerHandler) WakeOnLanComputer(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.WakeOnLanComputer(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": computer,
	})
}

func (h computerHandler) RebootComputer(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	computer, err := h.computerUseCase.RebootComputer(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": computer,
	})
}

func (h computerHandler) GetComputerAll(c *gin.Context) {
	computers, err := h.computerUseCase.GetComputerAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": computers,
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
		"data": computer,
	})
}
