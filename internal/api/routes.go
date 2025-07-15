package api

import (
	"gachimatsu-backend/internal/handlers"

	"github.com/gorilla/mux"
)

// SetupRoutes APIルートを設定
func SetupRoutes(router *mux.Router) {
	// メニュー関連のエンドポイント
	router.HandleFunc("/menus", handlers.GetMenus).Methods("GET")
	router.HandleFunc("/menus/{id}", handlers.GetMenu).Methods("GET")

	// 食事記録関連のエンドポイント
	router.HandleFunc("/records", handlers.GetRecords).Methods("GET")
	router.HandleFunc("/records", handlers.CreateRecord).Methods("POST")
	router.HandleFunc("/records/{id}", handlers.GetRecord).Methods("GET")
	router.HandleFunc("/records/{id}", handlers.UpdateRecord).Methods("PUT")
	router.HandleFunc("/records/{id}", handlers.DeleteRecord).Methods("DELETE")

	// 画像アップロード
	router.HandleFunc("/upload", handlers.UploadImage).Methods("POST")
} 