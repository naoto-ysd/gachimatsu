package models

// Stats 統計情報を表す構造体
type Stats struct {
	TotalMenus     int                `json:"total_menus"`
	TotalUsers     int                `json:"total_users"`
	MenusByCategory map[string]int    `json:"menus_by_category"`
	AveragePrice   float64           `json:"average_price"`
}

// CategoryStats カテゴリ統計を表す構造体
type CategoryStats struct {
	Category string `json:"category" db:"category"`
	Count    int    `json:"count" db:"count"`
}
