package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"gachimatsu-backend/internal/models"

	"github.com/gorilla/mux"
)

// GetUsers 全ユーザーを取得
func GetUsers(w http.ResponseWriter, r *http.Request) {
	// シンプルなダミーデータ
	users := []models.User{
		{
			ID:        1,
			Name:      "田中太郎",
			Email:     "tanaka@example.com",
			CreatedAt: time.Now().AddDate(0, -1, 0),
			UpdatedAt: time.Now(),
		},
		{
			ID:        2,
			Name:      "佐藤花子",
			Email:     "sato@example.com",
			CreatedAt: time.Now().AddDate(0, -2, 0),
			UpdatedAt: time.Now(),
		},
		{
			ID:        3,
			Name:      "山田次郎",
			Email:     "yamada@example.com",
			CreatedAt: time.Now().AddDate(0, -3, 0),
			UpdatedAt: time.Now(),
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// GetUser 特定のユーザーを取得
func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	// シンプルなダミーデータ
	user := models.User{
		ID:        id,
		Name:      "田中太郎",
		Email:     "tanaka@example.com",
		CreatedAt: time.Now().AddDate(0, -1, 0),
		UpdatedAt: time.Now(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}