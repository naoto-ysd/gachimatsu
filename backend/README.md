# Gachimatsu Backend

松屋食事記録アプリのGoバックエンドAPI

## 概要

このプロジェクトは松屋のメニューを管理するためのREST APIです。メニューの一覧取得、詳細取得機能を提供します。

## 技術スタック

- **言語**: Go 1.24+
- **フレームワーク**: Gorilla Mux
- **アーキテクチャ**: Clean Architecture

## プロジェクト構造

```
backend/
├── cmd/server/          # アプリケーションエントリーポイント
├── internal/
│   ├── api/            # APIルート設定
│   ├── handlers/       # HTTPハンドラー（メニュー機能）
│   ├── middleware/     # ミドルウェア
│   ├── models/         # データモデル（メニュー）
│   └── database/       # データベース関連
├── pkg/utils/          # ユーティリティ
└── bin/                # ビルド成果物

```

## セットアップ

### 1. 依存関係のインストール

```bash
go mod tidy
```

### 2. サーバーの起動

```bash
# 開発モード（自動リロード）
go run ./cmd/server

# バイナリをビルドして実行
go build -o bin/server ./cmd/server
./bin/server
```

サーバーは `http://localhost:8080` で起動します。

## API エンドポイント

### ヘルスチェック

```
GET /health
```

### メニュー

- `GET /api/v1/menus` - 全メニュー取得
- `GET /api/v1/menus/{id}` - 特定メニュー取得

## 使用例

### メニュー一覧の取得

```bash
curl http://localhost:8080/api/v1/menus
```

### 特定メニューの取得

```bash
curl http://localhost:8080/api/v1/menus/1
```

## 環境変数

| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| PORT   | 8080        | サーバーポート |

## 開発

### コードフォーマット

```bash
go fmt ./...
```

### テスト実行

```bash
go test ./...
```

## TODO

- [ ] データベース連携 (PostgreSQL/MySQL)
- [ ] メニューのカテゴリ別フィルタリング機能
- [ ] メニューの検索機能
- [ ] ユニットテスト追加
- [ ] Docker対応
- [ ] ログ改善 