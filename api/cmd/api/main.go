package main

import (
	"github.com/gin-gonic/gin"
	"api/internal/app/api/pkg/database"
	"api/internal/app/api/computer"
)

func main() {
	database.Connect()

	r := gin.Default()
	v1 := r.Group("/api/v1")
	computer.AddComputerRoutes(v1)
	r.Run(":8000")
}
