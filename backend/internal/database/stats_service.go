package database

import (
	"database/sql"
	"gachimatsu-backend/internal/models"
)

// GetStats 統計情報を取得
func GetStats() (*models.Stats, error) {
	stats := &models.Stats{
		MenusByCategory: make(map[string]int),
	}

	// 総メニュー数を取得
	err := DB.QueryRow("SELECT COUNT(*) FROM menus").Scan(&stats.TotalMenus)
	if err != nil {
		return nil, err
	}

	// 総ユーザー数を取得
	err = DB.QueryRow("SELECT COUNT(*) FROM users").Scan(&stats.TotalUsers)
	if err != nil {
		return nil, err
	}

	// 平均価格を取得
	err = DB.QueryRow("SELECT COALESCE(AVG(price), 0) FROM menus").Scan(&stats.AveragePrice)
	if err != nil {
		return nil, err
	}

	// カテゴリ別メニュー数を取得
	rows, err := DB.Query("SELECT category, COUNT(*) as count FROM menus GROUP BY category")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var categoryStats models.CategoryStats
		err := rows.Scan(&categoryStats.Category, &categoryStats.Count)
		if err != nil {
			return nil, err
		}
		stats.MenusByCategory[categoryStats.Category] = categoryStats.Count
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return stats, nil
}
