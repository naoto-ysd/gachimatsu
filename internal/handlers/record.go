package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"gachimatsu-backend/internal/models"

	"github.com/gorilla/mux"
)

// GetRecords 全ての食事記録を取得
func GetRecords(w http.ResponseWriter, r *http.Request) {
	// TODO: データベースから実際の記録を取得する
	// 今はダミーデータを返す
	records := []models.Record{
		{
			ID:       1,
			MenuID:   1,
			MenuName: "牛めし（並）",
			ImageURL: "/images/record1.jpg",
			Date:     time.Now().AddDate(0, 0, -1),
			Memo:     "いつも通り美味しかった。紅生姜を多めに追加。",
		},
		{
			ID:       2,
			MenuID:   3,
			MenuName: "カレギュウ",
			ImageURL: "/images/record2.jpg",
			Date:     time.Now().AddDate(0, 0, -3),
			Memo:     "カレーが濃厚で美味しい。",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(records)
}

// GetRecord 特定の食事記録を取得
func GetRecord(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid record ID", http.StatusBadRequest)
		return
	}

	// TODO: データベースから実際の記録を取得する
	record := models.Record{
		ID:       id,
		MenuID:   1,
		MenuName: "牛めし（並）",
		ImageURL: "/images/record1.jpg",
		Date:     time.Now().AddDate(0, 0, -1),
		Memo:     "いつも通り美味しかった。紅生姜を多めに追加。",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(record)
}

// CreateRecord 新しい食事記録を作成
func CreateRecord(w http.ResponseWriter, r *http.Request) {
	var req models.CreateRecordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 日付の解析
	date, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		http.Error(w, "Invalid date format", http.StatusBadRequest)
		return
	}

	// TODO: データベースに実際に保存する
	// 今はダミーのレスポンスを返す
	record := models.Record{
		ID:       1, // 実際はデータベースで自動生成
		MenuID:   req.MenuID,
		MenuName: "牛めし（並）", // JOINで取得
		ImageURL: req.ImageURL,
		Date:     date,
		Memo:     req.Memo,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(record)
}

// UpdateRecord 食事記録を更新
func UpdateRecord(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid record ID", http.StatusBadRequest)
		return
	}

	var req models.UpdateRecordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: データベースで実際に更新する
	record := models.Record{
		ID:       id,
		MenuID:   1,
		MenuName: "牛めし（並）",
		ImageURL: req.ImageURL,
		Date:     time.Now(),
		Memo:     req.Memo,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(record)
}

// DeleteRecord 食事記録を削除
func DeleteRecord(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	_, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid record ID", http.StatusBadRequest)
		return
	}

	// TODO: データベースから実際に削除する

	w.WriteHeader(http.StatusNoContent)
} 