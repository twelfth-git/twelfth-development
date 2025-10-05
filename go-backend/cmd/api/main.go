package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"pedra90z/go-backend/internal/data"
	"pedra90z/go-backend/internal/handlers"
)

func main() {
	log.Println("Iniciando API...")

	// 1. Carregar os dados das partidas
	matches, err := data.LoadMatches("match-data.json")
	if err != nil {
		log.Fatalf("Erro ao carregar os dados da partida: %v", err)
	}
	log.Printf("Carregadas %d partidas com sucesso.", len(matches))

	// 2. Carregar os dados dos times e convertê-los para um mapa
	teamDataMap, err := data.LoadTeamsToMap("teams.json")
	if err != nil {
		log.Fatalf("Erro ao carregar e mapear os dados dos times: %v", err)
	}
	log.Printf("Carregados e mapeados dados de %d times.", len(teamDataMap))

	// 3. Carregar os dados dos jogadores e convertê-los para um mapa
	playerDataMap, err := data.LoadPlayersToMap(`F:\nowornever\Twelfth\twelfth-development-clean\go-backend\players.json`)
	if err != nil {
		log.Fatalf("Erro ao carregar e mapear os dados dos jogadores: %v", err)
	}
	log.Printf("Carregados e mapeados dados de %d jogadores.", len(playerDataMap))

	// 4. Configurar o Roteador Gin
	r := gin.Default()

	// 5. Configurar o CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET"},
		AllowHeaders: []string{"Origin"},
	}))

	// 6. Configurar as Rotas
	apiV1 := r.Group("/api/v1")
	{
		// CORREÇÃO: Passe o 'playerDataMap' como terceiro argumento
		matchHandler := handlers.NewMatchHandler(matches, teamDataMap, playerDataMap)
		apiV1.GET("/match/:id", matchHandler)

		// CORREÇÃO: Passe o 'playerDataMap' como terceiro argumento
		teamHandler := handlers.NewTeamHandler(matches, teamDataMap, playerDataMap)
		apiV1.GET("/team/:teamName", teamHandler)

		playerHandler := handlers.NewPlayerHandler(playerDataMap)
		apiV1.GET("/player/:id", playerHandler)
	}

	// 7. Iniciar o Servidor
	log.Println("Servidor escutando na porta :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
