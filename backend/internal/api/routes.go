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
	
	// ユーザー関連のエンドポイント
	router.HandleFunc("/users", handlers.GetUsers).Methods("GET")
	router.HandleFunc("/users/emails", handlers.GetUserEmails).Methods("GET")
	router.HandleFunc("/users/{id}", handlers.GetUserByID).Methods("GET")
	router.HandleFunc("/users/{id}", handlers.DeleteUser).Methods("DELETE")
} 