package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"gachimatsu-backend/internal/models"

	"github.com/gorilla/mux"
)

// GetMenus 全メニューを取得
func GetMenus(w http.ResponseWriter, r *http.Request) {
	// TODO: データベースから実際のメニューを取得する
	// 今はダミーデータを返す
	menus := []models.Menu{
		{
			ID:          1,
			Name:        "牛めし（並）",
			Category:    "牛めし",
			Price:       380,
			Description: "松屋の定番メニュー",
			ImageURL:    "/images/gyumeshi-nami.jpg",
			IsAvailable: true,
		},
		{
			ID:          2,
			Name:        "牛めし（大盛）",
			Category:    "牛めし",
			Price:       480,
			Description: "松屋の定番メニュー（大盛）",
			ImageURL:    "/images/gyumeshi-omori.jpg",
			IsAvailable: true,
		},
		{
			ID:          3,
			Name:        "カレギュウ",
			Category:    "カレー",
			Price:       490,
			Description: "カレーと牛肉のコラボレーション",
			ImageURL:    "/images/kareegyu.jpg",
			IsAvailable: true,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(menus)
}

// GetMenu 特定のメニューを取得
func GetMenu(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid menu ID", http.StatusBadRequest)
		return
	}

	// TODO: データベースから実際のメニューを取得する
	// 今はダミーデータを返す
	menu := models.Menu{
		ID:          id,
		Name:        "牛めし（並）",
		Category:    "牛めし",
		Price:       380,
		Description: "松屋の定番メニュー",
		ImageURL:    "/images/gyumeshi-nami.jpg",
		IsAvailable: true,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(menu)
} 