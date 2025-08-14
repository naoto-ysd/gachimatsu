package database

import (
	"gachimatsu-backend/internal/models"
)

// GetPopularMenus 人気メニューランキングを取得
func GetPopularMenus(limit int) ([]models.PopularMenu, error) {
	query := `
		SELECT 
			m.id as menu_id,
			m.name,
			m.category,
			m.price,
			COALESCE(o.order_count, 0) as order_count,
			COALESCE(r.avg_rating, 0) as avg_rating,
			COALESCE(r.total_rating, 0) as total_rating
		FROM menus m
		LEFT JOIN (
			SELECT menu_id, COUNT(*) as order_count
			FROM orders 
			GROUP BY menu_id
		) o ON m.id = o.menu_id
		LEFT JOIN (
			SELECT menu_id, AVG(rating) as avg_rating, COUNT(*) as total_rating
			FROM menu_ratings 
			GROUP BY menu_id
		) r ON m.id = r.menu_id
		ORDER BY (COALESCE(o.order_count, 0) * 0.7 + COALESCE(r.avg_rating, 0) * COALESCE(r.total_rating, 0) * 0.3) DESC
		LIMIT ?`

	rows, err := DB.Query(query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var popularMenus []models.PopularMenu
	for rows.Next() {
		var menu models.PopularMenu
		err := rows.Scan(
			&menu.MenuID,
			&menu.Name,
			&menu.Category,
			&menu.Price,
			&menu.OrderCount,
			&menu.AvgRating,
			&menu.TotalRating,
		)
		if err != nil {
			return nil, err
		}
		popularMenus = append(popularMenus, menu)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return popularMenus, nil
}

// GetPopularMenusByCategory カテゴリ別人気メニューを取得
func GetPopularMenusByCategory(category string, limit int) ([]models.PopularMenu, error) {
	query := `
		SELECT 
			m.id as menu_id,
			m.name,
			m.category,
			m.price,
			COALESCE(o.order_count, 0) as order_count,
			COALESCE(r.avg_rating, 0) as avg_rating,
			COALESCE(r.total_rating, 0) as total_rating
		FROM menus m
		LEFT JOIN (
			SELECT menu_id, COUNT(*) as order_count
			FROM orders 
			GROUP BY menu_id
		) o ON m.id = o.menu_id
		LEFT JOIN (
			SELECT menu_id, AVG(rating) as avg_rating, COUNT(*) as total_rating
			FROM menu_ratings 
			GROUP BY menu_id
		) r ON m.id = r.menu_id
		WHERE m.category = ?
		ORDER BY (COALESCE(o.order_count, 0) * 0.7 + COALESCE(r.avg_rating, 0) * COALESCE(r.total_rating, 0) * 0.3) DESC
		LIMIT ?`

	rows, err := DB.Query(query, category, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var popularMenus []models.PopularMenu
	for rows.Next() {
		var menu models.PopularMenu
		err := rows.Scan(
			&menu.MenuID,
			&menu.Name,
			&menu.Category,
			&menu.Price,
			&menu.OrderCount,
			&menu.AvgRating,
			&menu.TotalRating,
		)
		if err != nil {
			return nil, err
		}
		popularMenus = append(popularMenus, menu)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return popularMenus, nil
}

// GetMenuRanking 全体ランキングとカテゴリ別ランキングを取得
func GetMenuRanking(limit int) (*models.MenuRanking, error) {
	ranking := &models.MenuRanking{
		CategoryRankings: make(map[string][]models.PopularMenu),
	}

	// 全体ランキングを取得
	overallRanking, err := GetPopularMenus(limit)
	if err != nil {
		return nil, err
	}
	ranking.OverallRanking = overallRanking

	// カテゴリ一覧を取得
	categoryQuery := "SELECT DISTINCT category FROM menus"
	rows, err := DB.Query(categoryQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []string
	for rows.Next() {
		var category string
		err := rows.Scan(&category)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	// 各カテゴリのランキングを取得
	for _, category := range categories {
		categoryRanking, err := GetPopularMenusByCategory(category, limit)
		if err != nil {
			return nil, err
		}
		ranking.CategoryRankings[category] = categoryRanking
	}

	return ranking, nil
}
