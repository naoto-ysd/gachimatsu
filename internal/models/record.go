package models

import "time"

// Record 食事記録を表す構造体
type Record struct {
	ID        int       `json:"id" db:"id"`
	MenuID    int       `json:"menu_id" db:"menu_id"`
	MenuName  string    `json:"menu_name" db:"menu_name"` // JOINで取得するため
	ImageURL  string    `json:"image_url" db:"image_url"`
	Date      time.Time `json:"date" db:"date"`
	Memo      string    `json:"memo" db:"memo"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// CreateRecordRequest 食事記録作成時のリクエスト構造体
type CreateRecordRequest struct {
	MenuID   int    `json:"menu_id" validate:"required"`
	ImageURL string `json:"image_url"`
	Date     string `json:"date" validate:"required"`
	Memo     string `json:"memo"`
}

// UpdateRecordRequest 食事記録更新時のリクエスト構造体
type UpdateRecordRequest struct {
	ImageURL string `json:"image_url"`
	Date     string `json:"date"`
	Memo     string `json:"memo"`
} 