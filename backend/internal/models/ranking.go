package models

// PopularMenu 人気メニューの構造体
type PopularMenu struct {
	MenuID      int     `json:"menu_id" db:"menu_id"`
	Name        string  `json:"name" db:"name"`
	Category    string  `json:"category" db:"category"`
	Price       int     `json:"price" db:"price"`
	OrderCount  int     `json:"order_count" db:"order_count"`
	AvgRating   float64 `json:"avg_rating" db:"avg_rating"`
	TotalRating int     `json:"total_rating" db:"total_rating"`
}

// MenuRanking メニューランキングのレスポンス構造体
type MenuRanking struct {
	OverallRanking   []PopularMenu            `json:"overall_ranking"`
	CategoryRankings map[string][]PopularMenu `json:"category_rankings"`
}
