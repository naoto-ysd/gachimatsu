package handlers

import (
	"encoding/json"
	"gachimatsu-backend/internal/database"
	"net/http"
)

// GetStats 統計情報を取得するハンドラー
func GetStats(w http.ResponseWriter, r *http.Request) {
	stats, err := database.GetStats()
	if err != nil {
		http.Error(w, "Failed to get stats", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}
