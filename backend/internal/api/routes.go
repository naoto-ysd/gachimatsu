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

	// 統計情報のエンドポイント
	router.HandleFunc("/stats", handlers.GetStats).Methods("GET")

	// 人気メニューランキング関連のエンドポイント
	router.HandleFunc("/ranking/popular", handlers.GetPopularMenus).Methods("GET")
	router.HandleFunc("/ranking/popular/{category}", handlers.GetPopularMenusByCategory).Methods("GET")
	router.HandleFunc("/ranking/menu-ranking", handlers.GetMenuRanking).Methods("GET")
}
