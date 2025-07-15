package models

import "time"

// Menu 松屋のメニューを表す構造体
type Menu struct {
	ID          int       `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	Category    string    `json:"category" db:"category"`
	Price       int       `json:"price" db:"price"`
	Description string    `json:"description" db:"description"`
	ImageURL    string    `json:"image_url" db:"image_url"`
	IsAvailable bool      `json:"is_available" db:"is_available"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
} 