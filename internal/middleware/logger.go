package middleware

import (
	"log"
	"net/http"
	"time"
)

// Logger middleware
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// レスポンスライターをラップして、ステータスコードを取得
		wrapper := &responseWrapper{ResponseWriter: w, statusCode: http.StatusOK}

		next.ServeHTTP(wrapper, r)

		log.Printf(
			"%s %s %d %v",
			r.Method,
			r.RequestURI,
			wrapper.statusCode,
			time.Since(start),
		)
	})
}

// レスポンスライターのラッパー
type responseWrapper struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWrapper) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
} 