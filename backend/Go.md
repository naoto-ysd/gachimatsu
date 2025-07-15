# Go プロジェクト構造の説明

このドキュメントでは、Goアプリケーション（gachimatsu-backend）のディレクトリ構造とその役割について説明します。

## 📁 プロジェクト全体の構造

```
backend/
├── cmd/                    # アプリケーションのエントリーポイント
│   └── server/
│       └── main.go
├── internal/               # プライベートなコード（他のプロジェクトから参照不可）
│   ├── api/               # API ルート定義
│   ├── handlers/          # HTTP リクエストハンドラー
│   ├── middleware/        # HTTP ミドルウェア
│   ├── models/            # データ構造の定義
│   └── database/          # データベース関連
├── pkg/                   # 公開可能なライブラリコード
│   └── utils/             # ユーティリティ関数
├── bin/                   # ビルドされた実行ファイル
├── go.mod                 # Go モジュール定義
├── go.sum                 # 依存関係のチェックサム
└── README.md              # プロジェクトの説明
```

## 🎯 各ディレクトリの詳細説明

### 1. `cmd/` ディレクトリ

**目的**: アプリケーションのエントリーポイント（メイン関数）を格納

```go
// cmd/server/main.go
package main

func main() {
    // アプリケーションの起動処理
}
```

**なぜ `cmd/` なのか？**
- Goの慣習として、実行可能なアプリケーションは `cmd/` に配置
- 複数のアプリケーション（例：サーバー、CLI ツール）を持つプロジェクトで整理しやすい
- `main` パッケージは実行ファイルの起点となる

**ファイル例**:
```
cmd/
├── server/main.go     # Web サーバーの起動
├── migrate/main.go    # データベースマイグレーション（今後追加予定）
└── seed/main.go       # テストデータの投入（今後追加予定）
```

### 2. `internal/` ディレクトリ

**目的**: プロジェクト内でのみ使用されるプライベートなコード

**重要な特徴**:
- `internal/` 内のパッケージは外部プロジェクトからインポート**できない**
- Goコンパイラが強制するルール
- 内部実装の詳細を隠蔽し、APIの安定性を保つ

#### 2.1 `internal/api/`

**目的**: HTTP ルートの定義とセットアップ

```go
// internal/api/routes.go
func SetupRoutes(router *mux.Router) {
    router.HandleFunc("/menus", handlers.GetMenus).Methods("GET")
    router.HandleFunc("/menus/{id}", handlers.GetMenu).Methods("GET")
}
```

**役割**:
- URL パスとハンドラー関数の紐付け
- HTTP メソッド（GET、POST等）の指定
- ルーティングの一元管理

#### 2.2 `internal/handlers/`

**目的**: HTTP リクエストの処理ロジック

```go
// internal/handlers/menu.go
func GetMenus(w http.ResponseWriter, r *http.Request) {
    // 1. リクエストの解析
    // 2. ビジネスロジックの実行
    // 3. レスポンスの生成
}
```

**役割**:
- HTTP リクエストを受け取る
- 必要なデータを取得・処理
- JSON レスポンスを返す
- エラーハンドリング

#### 2.3 `internal/middleware/`

**目的**: HTTP リクエスト/レスポンスの前処理・後処理

```go
// internal/middleware/cors.go
func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // CORS ヘッダーの設定
        w.Header().Set("Access-Control-Allow-Origin", "*")
        next.ServeHTTP(w, r) // 次の処理に進む
    })
}
```

**一般的なミドルウェア**:
- **CORS**: Cross-Origin Resource Sharing の設定
- **Logger**: リクエストのログ記録
- **Auth**: 認証・認可の処理
- **Rate Limit**: アクセス頻度の制限

#### 2.4 `internal/models/`

**目的**: データ構造（構造体）の定義

```go
// internal/models/menu.go
type Menu struct {
    ID          int       `json:"id" db:"id"`
    Name        string    `json:"name" db:"name"`
    Category    string    `json:"category" db:"category"`
    Price       int       `json:"price" db:"price"`
    CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
```

**タグの説明**:
- `json:"id"`: JSON シリアライゼーション時のキー名
- `db:"id"`: データベースのカラム名とのマッピング

#### 2.5 `internal/database/`

**目的**: データベース接続・操作に関するコード

```go
// 今後実装予定の例
// internal/database/connection.go
func Connect() (*sql.DB, error) {
    // データベース接続の設定
}

// internal/database/menu.go
func GetAllMenus() ([]models.Menu, error) {
    // メニュー一覧をデータベースから取得
}
```

### 3. `pkg/` ディレクトリ

**目的**: 他のプロジェクトでも使用可能な汎用的なコード

```go
// pkg/utils/response.go
func WriteJSONResponse(w http.ResponseWriter, data interface{}) {
    // JSON レスポンスを書き出すユーティリティ関数
}
```

**`internal/` との違い**:
- `pkg/` は外部プロジェクトからインポート可能
- 汎用的で再利用可能なコードを配置
- 第三者にライブラリとして提供できる

### 4. `bin/` ディレクトリ

**目的**: ビルドされた実行ファイルの格納場所

```bash
# ビルドコマンド
go build -o bin/server ./cmd/server

# 実行
./bin/server
```

**特徴**:
- Git では通常無視する（`.gitignore` に追加）
- デプロイ時にはこのバイナリファイルを使用

## 🔧 ファイルの命名規則

### パッケージ名
```go
package handlers  // ディレクトリ名と同じ
package models    // 複数形を使用
package middleware // 単数形（概念的なもの）
```

### ファイル名
```go
menu.go           // 機能別に分割
user.go           // エンティティ別
cors.go           // 具体的な機能名
logger.go         // 具体的な機能名
```

## 🚀 バックエンドに機能を追加する手順

### 📋 基本的な開発ワークフロー

新しい機能（例：カテゴリ管理機能）を追加する場合の詳細な手順を説明します。

#### ステップ1: 要件の整理
```
機能例: カテゴリ管理API
- GET /api/v1/categories    # カテゴリ一覧取得
- GET /api/v1/categories/{id} # 特定カテゴリ取得
- POST /api/v1/categories   # カテゴリ作成
- PUT /api/v1/categories/{id} # カテゴリ更新
- DELETE /api/v1/categories/{id} # カテゴリ削除
```

#### ステップ2: モデル定義 (`internal/models/`)

**ファイル**: `internal/models/category.go`

```go
package models

import "time"

// Category カテゴリを表す構造体
type Category struct {
    ID          int       `json:"id" db:"id"`
    Name        string    `json:"name" db:"name"`
    Description string    `json:"description" db:"description"`
    CreatedAt   time.Time `json:"created_at" db:"created_at"`
    UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// CreateCategoryRequest カテゴリ作成時のリクエスト構造体
type CreateCategoryRequest struct {
    Name        string `json:"name" validate:"required,min=1,max=50"`
    Description string `json:"description" validate:"max=200"`
}

// UpdateCategoryRequest カテゴリ更新時のリクエスト構造体
type UpdateCategoryRequest struct {
    Name        string `json:"name" validate:"omitempty,min=1,max=50"`
    Description string `json:"description" validate:"omitempty,max=200"`
}
```

**ポイント**:
- JSON タグで API レスポンス時のキー名を指定
- バリデーションタグで入力検証ルールを定義
- 作成用・更新用の専用構造体を用意（セキュリティ向上）

#### ステップ3: ハンドラー作成 (`internal/handlers/`)

**ファイル**: `internal/handlers/category.go`

```go
package handlers

import (
    "encoding/json"
    "net/http"
    "strconv"

    "gachimatsu-backend/internal/models"
    "github.com/gorilla/mux"
)

// GetCategories 全カテゴリを取得
func GetCategories(w http.ResponseWriter, r *http.Request) {
    // TODO: データベースから実際のカテゴリを取得する
    categories := []models.Category{
        {
            ID:          1,
            Name:        "牛めし",
            Description: "松屋の定番牛めしシリーズ",
        },
        {
            ID:          2,
            Name:        "カレー",
            Description: "各種カレーメニュー",
        },
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(categories); err != nil {
        http.Error(w, "Failed to encode response", http.StatusInternalServerError)
        return
    }
}

// GetCategory 特定のカテゴリを取得
func GetCategory(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid category ID", http.StatusBadRequest)
        return
    }

    // TODO: データベースから実際のカテゴリを取得する
    category := models.Category{
        ID:          id,
        Name:        "牛めし",
        Description: "松屋の定番牛めしシリーズ",
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(category); err != nil {
        http.Error(w, "Failed to encode response", http.StatusInternalServerError)
        return
    }
}

// CreateCategory 新しいカテゴリを作成
func CreateCategory(w http.ResponseWriter, r *http.Request) {
    var req models.CreateCategoryRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // バリデーション（実際にはvalidatorライブラリを使用）
    if req.Name == "" {
        http.Error(w, "Name is required", http.StatusBadRequest)
        return
    }

    // TODO: データベースに実際に保存する
    category := models.Category{
        ID:          1, // 実際はデータベースで自動生成
        Name:        req.Name,
        Description: req.Description,
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    if err := json.NewEncoder(w).Encode(category); err != nil {
        http.Error(w, "Failed to encode response", http.StatusInternalServerError)
        return
    }
}

// UpdateCategory カテゴリを更新
func UpdateCategory(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid category ID", http.StatusBadRequest)
        return
    }

    var req models.UpdateCategoryRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // TODO: データベースで実際に更新する
    category := models.Category{
        ID:          id,
        Name:        req.Name,
        Description: req.Description,
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(category); err != nil {
        http.Error(w, "Failed to encode response", http.StatusInternalServerError)
        return
    }
}

// DeleteCategory カテゴリを削除
func DeleteCategory(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid category ID", http.StatusBadRequest)
        return
    }

    // TODO: データベースから実際に削除する
    _ = id // 削除処理の実装

    w.WriteHeader(http.StatusNoContent)
}
```

#### ステップ4: ルート追加 (`internal/api/routes.go`)

既存のファイルに新しいルートを追加：

```go
func SetupRoutes(router *mux.Router) {
    // 既存のメニュー関連エンドポイント
    router.HandleFunc("/menus", handlers.GetMenus).Methods("GET")
    router.HandleFunc("/menus/{id}", handlers.GetMenu).Methods("GET")
    
    // 新しいカテゴリ関連エンドポイント
    router.HandleFunc("/categories", handlers.GetCategories).Methods("GET")
    router.HandleFunc("/categories/{id}", handlers.GetCategory).Methods("GET")
    router.HandleFunc("/categories", handlers.CreateCategory).Methods("POST")
    router.HandleFunc("/categories/{id}", handlers.UpdateCategory).Methods("PUT")
    router.HandleFunc("/categories/{id}", handlers.DeleteCategory).Methods("DELETE")
}
```

#### ステップ5: ビルドとテスト

```bash
# 1. ビルド
go build -o bin/server ./cmd/server

# 2. サーバー起動
./bin/server

# 3. 別ターミナルでテスト

# カテゴリ一覧取得
curl http://localhost:8080/api/v1/categories

# 特定カテゴリ取得
curl http://localhost:8080/api/v1/categories/1

# カテゴリ作成
curl -X POST http://localhost:8080/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"定食","description":"各種定食メニュー"}'

# カテゴリ更新
curl -X PUT http://localhost:8080/api/v1/categories/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"牛めし（更新）","description":"更新された説明"}'

# カテゴリ削除
curl -X DELETE http://localhost:8080/api/v1/categories/1
```

### 🧪 テストの書き方

#### ステップ6: ユニットテストの作成

**ファイル**: `internal/handlers/category_test.go`

```go
package handlers

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gorilla/mux"
)

func TestGetCategories(t *testing.T) {
    // リクエストを作成
    req, err := http.NewRequest("GET", "/categories", nil)
    if err != nil {
        t.Fatal(err)
    }

    // レスポンスレコーダーを作成
    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(GetCategories)

    // ハンドラーを実行
    handler.ServeHTTP(rr, req)

    // ステータスコードをチェック
    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }

    // レスポンスボディをチェック
    var categories []interface{}
    if err := json.Unmarshal(rr.Body.Bytes(), &categories); err != nil {
        t.Errorf("Failed to unmarshal response: %v", err)
    }

    if len(categories) == 0 {
        t.Error("Expected at least one category")
    }
}

func TestCreateCategory(t *testing.T) {
    // リクエストボディを作成
    body := map[string]string{
        "name":        "テストカテゴリ",
        "description": "テスト用の説明",
    }
    jsonBody, _ := json.Marshal(body)

    // リクエストを作成
    req, err := http.NewRequest("POST", "/categories", bytes.NewBuffer(jsonBody))
    if err != nil {
        t.Fatal(err)
    }
    req.Header.Set("Content-Type", "application/json")

    // レスポンスレコーダーを作成
    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(CreateCategory)

    // ハンドラーを実行
    handler.ServeHTTP(rr, req)

    // ステータスコードをチェック
    if status := rr.Code; status != http.StatusCreated {
        t.Errorf("handler returned wrong status code: got %v want %v",
            status, http.StatusCreated)
    }
}
```

#### テストの実行

```bash
# 特定のパッケージのテストを実行
go test ./internal/handlers

# 詳細な出力でテストを実行
go test -v ./internal/handlers

# 全プロジェクトのテストを実行
go test ./...
```

### 🚨 エラーハンドリングのベストプラクティス

#### 1. 適切なHTTPステータスコードの使用

```go
// 400 Bad Request - クライアントのリクエストが不正
if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    http.Error(w, "Invalid request body", http.StatusBadRequest)
    return
}

// 404 Not Found - リソースが見つからない
if category == nil {
    http.Error(w, "Category not found", http.StatusNotFound)
    return
}

// 500 Internal Server Error - サーバー内部エラー
if err := json.NewEncoder(w).Encode(category); err != nil {
    http.Error(w, "Failed to encode response", http.StatusInternalServerError)
    return
}
```

#### 2. 構造化されたエラーレスポンス

```go
// エラーレスポンス用の構造体
type ErrorResponse struct {
    Error   string `json:"error"`
    Message string `json:"message"`
    Code    int    `json:"code"`
}

// エラーレスポンスを返すヘルパー関数
func writeErrorResponse(w http.ResponseWriter, err string, message string, code int) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(code)
    
    errorResp := ErrorResponse{
        Error:   err,
        Message: message,
        Code:    code,
    }
    
    json.NewEncoder(w).Encode(errorResp)
}
```

### 📝 開発時のチェックリスト

#### 新機能追加時の確認事項

- [ ] **モデル定義**
  - [ ] 構造体のフィールド名は適切か
  - [ ] JSON タグは正しく設定されているか
  - [ ] バリデーションタグは適切か
  
- [ ] **ハンドラー実装**
  - [ ] エラーハンドリングは適切か
  - [ ] HTTPステータスコードは正しいか
  - [ ] レスポンスヘッダーは設定されているか
  
- [ ] **ルート設定**
  - [ ] URLパスは RESTful な設計になっているか
  - [ ] HTTPメソッドは適切か
  
- [ ] **テスト**
  - [ ] 正常系のテストケースはあるか
  - [ ] 異常系のテストケースはあるか
  - [ ] エッジケースのテストケースはあるか

### 🛠️ よくある間違いとトラブルシューティング

#### 1. インポートエラー
```bash
# エラー例
build command-line-arguments: cannot find package

# 解決方法
go mod tidy  # 依存関係を整理
```

#### 2. 構造体のフィールドが JSON に含まれない
```go
// ❌ 小文字で開始（プライベート）
type Category struct {
    id   int    `json:"id"`
    name string `json:"name"`
}

// ✅ 大文字で開始（パブリック）
type Category struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}
```

#### 3. ルートが認識されない
```go
// ❌ メソッドの指定忘れ
router.HandleFunc("/categories", handlers.GetCategories)

// ✅ メソッドを明示的に指定
router.HandleFunc("/categories", handlers.GetCategories).Methods("GET")
```

### 🔄 コードの依存関係

```
main.go
    ↓ インポート
internal/api (routes.go)
    ↓ インポート
internal/handlers (category.go, menu.go)
    ↓ インポート
internal/models (category.go, menu.go)
```

この流れに従って開発することで、保守性の高いコードを書くことができます。

## 📚 Goプロジェクト構造の参考資料

1. **Standard Go Project Layout**: https://github.com/golang-standards/project-layout
2. **Go公式ブログ**: https://blog.golang.org/organizing-go-code
3. **Clean Architecture in Go**: レイヤード アーキテクチャの実装例

## 🎓 初心者向けのポイント

### 1. パッケージの考え方
- 1つのディレクトリ = 1つのパッケージ
- パッケージ名は短く、説明的に
- `main` パッケージは特別（実行可能ファイル）

### 2. インポートパス
```go
import "gachimatsu-backend/internal/models"
import "gachimatsu-backend/internal/handlers"
```

### 3. エクスポート（公開）
```go
// 大文字で開始 = 公開（他のパッケージから使用可能）
func GetMenus() {}
type Menu struct{}

// 小文字で開始 = プライベート（同じパッケージ内でのみ使用可能）
func getConnection() {}
type config struct{}
```

### 4. 開発のベストプラクティス
- **単一責任**: 各パッケージは1つの責任を持つ
- **依存関係の方向**: 外側から内側へ（main → api → handlers → models）
- **テスト**: `_test.go` ファイルでテストを書く
- **ドキュメント**: 公開関数にはコメントを書く

この構造により、コードの保守性、テスタビリティ、拡張性が向上します。 