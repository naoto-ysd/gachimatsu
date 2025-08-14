package handlers

import (
	"encoding/json"
	"gachimatsu-backend/internal/database"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// GetPopularMenus 人気メニューランキングを取得するハンドラー
func GetPopularMenus(w http.ResponseWriter, r *http.Request) {
	// クエリパラメータからlimitを取得（デフォルト: 10）
	limitStr := r.URL.Query().Get("limit")
	limit := 10
	if limitStr != "" {
		if parsedLimit, err := strconv.Atoi(limitStr); err == nil && parsedLimit > 0 {
			limit = parsedLimit
		}
	}

	popularMenus, err := database.GetPopularMenus(limit)
	if err != nil {
		http.Error(w, "Failed to get popular menus", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(popularMenus)
}

// GetPopularMenusByCategory カテゴリ別人気メニューを取得するハンドラー
func GetPopularMenusByCategory(w http.ResponseWriter, r *http.Request) {
	// URLパラメータからカテゴリを取得
	vars := mux.Vars(r)
	category := vars["category"]

	if category == "" {
		http.Error(w, "Category parameter is required", http.StatusBadRequest)
		return
	}

	// クエリパラメータからlimitを取得（デフォルト: 10）
	limitStr := r.URL.Query().Get("limit")
	limit := 10
	if limitStr != "" {
		if parsedLimit, err := strconv.Atoi(limitStr); err == nil && parsedLimit > 0 {
			limit = parsedLimit
		}
	}

	popularMenus, err := database.GetPopularMenusByCategory(category, limit)
	if err != nil {
		http.Error(w, "Failed to get popular menus by category", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(popularMenus)
}

// GetMenuRanking 全体ランキングとカテゴリ別ランキングを取得するハンドラー
func GetMenuRanking(w http.ResponseWriter, r *http.Request) {
	// クエリパラメータからlimitを取得（デフォルト: 10）
	limitStr := r.URL.Query().Get("limit")
	limit := 10
	if limitStr != "" {
		if parsedLimit, err := strconv.Atoi(limitStr); err == nil && parsedLimit > 0 {
			limit = parsedLimit
		}
	}

	ranking, err := database.GetMenuRanking(limit)
	if err != nil {
		http.Error(w, "Failed to get menu ranking", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ranking)
}
