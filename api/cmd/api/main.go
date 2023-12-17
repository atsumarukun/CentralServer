package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"api/internal/app/api/pkg/database"
	"api/internal/app/api/computer"
)

func main() {
	database.Connect()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"*",
		},
	}))
	v1 := r.Group("/api/v1")
	computer.AddComputerRoutes(v1)
	r.Run(":8000")
}
