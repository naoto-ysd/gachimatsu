# Goの公式イメージを使用
FROM golang:1.24-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてダウンロード
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# バイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o main cmd/server/main.go

# 実行用の軽量イメージ
FROM debian:bookworm-slim

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
  ca-certificates \
  tzdata \
  && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /root/

# ビルドしたバイナリをコピー
COPY --from=builder /app/main .

# ポートを公開
EXPOSE 8080

# 実行コマンド
CMD ["./main"]