package database

import (
	"database/sql"
	"strings"
	"gachimatsu-backend/internal/models"
)

// GetAllUsers 全ユーザーを取得
func GetAllUsers() ([]models.User, error) {
	query := `
		SELECT id, name, email, created_at, updated_at 
		FROM users 
		ORDER BY id
	`

	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

// GetUserByID 特定のユーザーを取得
func GetUserByID(id int) (*models.User, error) {
	query := `
		SELECT id, name, email, created_at, updated_at 
		FROM users 
		WHERE id = ?
	`

	var user models.User
	err := DB.QueryRow(query, id).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// CreateUser 新しいユーザーを作成
func CreateUser(user *models.User) error {
	query := `
		INSERT INTO users (name, email, created_at, updated_at) 
		VALUES (?, ?, NOW(), NOW())
	`

	result, err := DB.Exec(query, user.Name, user.Email)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	user.ID = int(id)
	return nil
}

// DeleteUserByID 特定のユーザーを削除
func DeleteUserByID(id int) error {
	query := `DELETE FROM users WHERE id = ?`
	
	result, err := DB.Exec(query, id)
	if err != nil {
		return err
	}
	
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	
	return nil
}

// Userをすべて取得してメールアドレスのドメインを取得する
// GetUserEmails ドメインごとにユーザーのメールアドレスを取得
func GetUserEmails() (map[string][]string, error) {
	users, err := GetAllUsers()
	if err != nil {
		return nil, err
	}
	emailMap := make(map[string][]string)
	for _, user := range users {
		domain := user.Email[strings.LastIndex(user.Email, "@")+1:]
		emailMap[domain] = append(emailMap[domain], user.Email)
	}
	return emailMap, nil
}

