# Docker セットアップガイド

このガイドでは、Docker Composeを使ってバックエンドAPIとMySQLデータベースを簡単に起動する方法を説明します。

## 📋 前提条件

- Docker
- Docker Compose

## 🚀 クイックスタート

### 1. アプリケーションを起動

```bash
# バックグラウンドで起動
docker-compose up -d

# ログを確認しながら起動
docker-compose up
```

### 2. アプリケーションにアクセス

```bash
# フロントエンドにアクセス
open http://localhost:3000

# バックエンドのヘルスチェック
curl http://localhost:8080/health

# ユーザー一覧取得
curl -s http://localhost:8080/api/v1/users | jq .

# 特定ユーザー取得
curl -s http://localhost:8080/api/v1/users/1 | jq .
```

### 3. アプリケーションを停止

```bash
# 停止
docker-compose down

# データも削除して停止
docker-compose down -v
```

## 📂 サービス構成

| サービス | ポート | 説明 |
|---------|--------|------|
| frontend | 3000 | Next.js フロントエンド |
| backend | 8080 | Go API サーバー |
| db | 3307 | MySQL データベース (外部ポート) |

## 🔧 開発用コマンド

### ログの確認

```bash
# 全サービスのログ
docker-compose logs

# 特定サービスのログ
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# リアルタイムでログを確認
docker-compose logs -f frontend
```

### データベースに接続

```bash
# MySQLに直接接続
docker-compose exec db mysql -u root -p gachimatsu
# パスワード: password
```

### コンテナに接続

```bash
# フロントエンドコンテナに接続
docker-compose exec frontend sh

# バックエンドコンテナに接続
docker-compose exec backend sh
```

### イメージの再ビルド

```bash
# 全サービスのイメージを再ビルド
docker-compose build

# 特定サービスのイメージを再ビルド
docker-compose build frontend
docker-compose build backend

# キャッシュを使わずに再ビルド
docker-compose build --no-cache
```

## 🗄️ データベース情報

### 接続情報

| 項目 | 値 |
|------|-----|
| ホスト | localhost (外部から) / db (コンテナ間) |
| ポート | 3307 (外部) / 3306 (コンテナ間) |
| データベース名 | gachimatsu |
| ユーザー | root |
| パスワード | password |

### 初期データ

コンテナ起動時に `backend/sql/001_create_users_table.sql` が自動実行され、以下のサンプルデータが挿入されます：

- 田中太郎 (tanaka@example.com)
- 佐藤花子 (sato@example.com)  
- 山田次郎 (yamada@example.com)

## 🛠️ トラブルシューティング

### ポートが既に使用されている場合

```bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# ポート8080を使用しているプロセスを確認
lsof -i :8080

# ポート3307を使用しているプロセスを確認
lsof -i :3307
```

### データベース接続エラーの場合

```bash
# データベースの状態を確認
docker-compose ps

# データベースのログを確認
docker-compose logs db
```

### 設定を変更したい場合

`docker-compose.yml` の環境変数を編集してください：

```yaml
environment:
  DB_USER: root
  DB_PASSWORD: your_password
  DB_HOST: db
  DB_PORT: 3306
  DB_NAME: your_database
```

## 🔄 開発ワークフロー

### フロントエンド開発
1. フロントエンドのコードを変更
2. `docker-compose build frontend` でイメージを再ビルド
3. `docker-compose up -d frontend` で再起動
4. http://localhost:3000 でアプリを確認

### バックエンド開発
1. バックエンドのコードを変更
2. `docker-compose build backend` でイメージを再ビルド
3. `docker-compose up -d backend` で再起動
4. APIテストを実行

### 全体の再ビルド
```bash
docker-compose build
docker-compose up -d
```