package database

import (
	"fmt"
	"log"
	"os"
	"twelfth/backend/internal/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar o arquivo .env")
	}

	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Falha ao conectar ao banco de dados")
	}

	fmt.Println("Conexão com o banco de dados estabelecida com sucesso.")

	db.AutoMigrate(&models.Team{}, &models.Player{}, &models.PlayerStatistic{})
	fmt.Println("Migração do banco de dados completada.")

	DB = db
}
