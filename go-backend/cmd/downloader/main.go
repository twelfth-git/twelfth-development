package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"twelfth/backend/internal/database"
	"twelfth/backend/internal/models"
	"twelfth/backend/internal/uploader"
)

func main() {
	fmt.Println("Iniciando script de download e upload de imagens...")
	database.Connect()

	var players []models.Player
	database.DB.Where("profile_image_url_source <> '' AND profile_image_url_source <> ? AND (profile_image = '' OR profile_image IS NULL)", "Imagem não encontrada na API").Find(&players)

	fmt.Printf("Encontrados %d jogadores para processar imagens.\n", len(players))

	client := &http.Client{}

	for _, player := range players {
		fmt.Printf("Processando imagem para: %s\n", player.Name)

		req, err := http.NewRequest("GET", player.ProfileImageURLSource, nil)
		if err != nil {
			log.Printf("ERRO ao criar requisição para %s: %v\n", player.Name, err)
			continue
		}
		req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")

		resp, err := client.Do(req)
		if err != nil {
			log.Printf("ERRO ao baixar imagem para %s: %v\n", player.Name, err)
			continue
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			log.Printf("ERRO: Status %d ao baixar imagem para %s\n", resp.StatusCode, player.Name)
			continue
		}

		imageData, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("ERRO ao ler dados da imagem para %s: %v\n", player.Name, err)
			continue
		}

		u, _ := url.Parse(player.ProfileImageURLSource)
		fileName := filepath.Base(u.Path)
		uploadPath := fmt.Sprintf("profiles/%d-%s", player.ID, fileName)

		contentType := http.DetectContentType(imageData)

		finalURL, err := uploader.UploadToS3(imageData, uploadPath, contentType)
		if err != nil {
			log.Printf("ERRO ao fazer upload para o S3 para %s: %v\n", player.Name, err)
			continue
		}

		player.ProfileImage = finalURL
		result := database.DB.Save(&player)
		if result.Error != nil {
			log.Printf("ERRO ao salvar a nova URL no banco para %s: %v\n", player.Name, result.Error)
			continue
		}

		fmt.Printf("-> Sucesso! Imagem salva em: %s\n", finalURL)
	}

	fmt.Println("Script finalizado.")
}
