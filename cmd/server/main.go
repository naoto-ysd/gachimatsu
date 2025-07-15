package main

import (
	"log"
	"net/http"
	"os"

	"gachimatsu-backend/internal/api"
	"gachimatsu-backend/internal/middleware"

	"github.com/gorilla/mux"
)

func main() {
	// ポート番号を環境変数から取得、デフォルトは8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// ルーターを初期化
	router := mux.NewRouter()

	// ミドルウェアを適用
	router.Use(middleware.CORS)
	router.Use(middleware.Logger)

	// APIルートを設定
	apiRouter := router.PathPrefix("/api/v1").Subrouter()
	api.SetupRoutes(apiRouter)

	// ヘルスチェック用エンドポイント
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
} 