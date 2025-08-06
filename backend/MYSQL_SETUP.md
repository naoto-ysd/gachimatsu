# MySQL セットアップガイド

## 1. MySQLのインストール

### macOS (Homebrew)
```bash
brew install mysql
brew services start mysql
```

### Docker使用の場合
```bash
docker run --name gachimatsu-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=gachimatsu \
  -p 3306:3306 \
  -d mysql:8.0
```

## 2. データベースとテーブルの作成

```bash
# MySQLに接続
mysql -u root -p

# データベース作成
CREATE DATABASE gachimatsu;
USE gachimatsu;

# テーブル作成（SQLファイルを使用）
source sql/001_create_users_table.sql;
```

## 3. 環境変数の設定

```bash
# 必要に応じて環境変数を設定
export DB_USER=root
export DB_PASSWORD=password
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=gachimatsu
```

## 4. サーバー起動

```bash
go run cmd/server/main.go
```

## 5. APIテスト

```bash
# ユーザー一覧取得
curl -s http://localhost:8080/api/v1/users | jq .

# 特定ユーザー取得
curl -s http://localhost:8080/api/v1/users/1 | jq .
```

## デフォルト設定

| 項目 | デフォルト値 |
|------|-------------|
| DB_USER | root |
| DB_PASSWORD | password |
| DB_HOST | localhost |
| DB_PORT | 3306 |
| DB_NAME | gachimatsu |