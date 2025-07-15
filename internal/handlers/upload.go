package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

// UploadResponse アップロードレスポンス
type UploadResponse struct {
	ImageURL string `json:"image_url"`
	Message  string `json:"message"`
}

// UploadImage 画像をアップロード
func UploadImage(w http.ResponseWriter, r *http.Request) {
	// ファイルサイズの制限（5MB）
	r.ParseMultipartForm(5 << 20)

	file, handler, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Failed to get image from request", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// ファイル形式のチェック
	contentType := handler.Header.Get("Content-Type")
	if contentType != "image/jpeg" && contentType != "image/png" && contentType != "image/jpg" {
		http.Error(w, "Only JPEG and PNG images are allowed", http.StatusBadRequest)
		return
	}

	// アップロード用ディレクトリを作成
	uploadDir := "uploads"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, 0755)
	}

	// ファイル名を生成（タイムスタンプ + オリジナル名）
	filename := fmt.Sprintf("%d_%s", time.Now().Unix(), handler.Filename)
	filePath := filepath.Join(uploadDir, filename)

	// ファイルを保存
	dst, err := os.Create(filePath)
	if err != nil {
		http.Error(w, "Failed to create file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}

	// レスポンスを作成
	response := UploadResponse{
		ImageURL: fmt.Sprintf("/api/v1/images/%s", filename),
		Message:  "Image uploaded successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
} 