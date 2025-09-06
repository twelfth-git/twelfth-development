package main

import (
	"twelfth/backend/internal/database"
	"twelfth/backend/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	database.Connect()
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	api := router.Group("/api")
	{
		api.GET("/player/:id", handlers.GetPlayerByID)
		api.GET("/team/:slug", handlers.GetTeamBySlug)
	}

	router.Run("localhost:8080")
}
