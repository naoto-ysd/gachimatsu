# Gachimatsu

[Next.js](https://nextjs.org) 15.3.5 と React 19 を使用したWebアプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 15.3.5 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **リンティング**: ESLint
- **パッケージマネージャー**: npm

## 必要な環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd gachimatsu
```

### 2. 依存関係のインストール

```bash
npm install
```

## 開発環境の起動

### 基本的な起動方法

```bash
npm run dev
```

このコマンドで以下が実行されます：
- Next.js開発サーバーが起動（Turbopack使用で高速）
- http://localhost:3000 でアプリケーションにアクセス可能
- ファイル変更時の自動リロード

### 起動確認

1. ターミナルで以下のメッセージが表示されることを確認：
```
▲ Next.js 15.3.5 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
✓ Ready in xxxms
```

2. ブラウザで http://localhost:3000 にアクセス
3. Next.jsのウェルカムページが表示されれば成功

### トラブルシューティング

#### ポートが使用中の場合
```bash
# 別のポートで起動
npm run dev -- -p 3001
```

#### キャッシュをクリアして起動
```bash
# .nextディレクトリを削除
rm -rf .next
npm run dev
```

#### 依存関係の問題
```bash
# node_modulesを再インストール
rm -rf node_modules package-lock.json
npm install
```

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（Turbopack付き） |
| `npm run build` | 本番用ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLintによるコードチェック |

## 開発ワークフロー

### 1. 開発開始
```bash
npm run dev
```

### 2. コード編集
- `src/app/page.tsx` - メインページ
- `src/app/layout.tsx` - ルートレイアウト  
- `src/app/globals.css` - グローバルスタイル

### 3. コードチェック
```bash
npm run lint
```

### 4. 本番ビルドテスト
```bash
npm run build
npm run start
```

## プロジェクト構造

```
gachimatsu/
├── src/
│   └── app/
│       ├── page.tsx        # メインページ
│       ├── layout.tsx      # ルートレイアウト
│       ├── globals.css     # グローバルスタイル
│       ├── history/        # 履歴機能
│       └── record/         # 記録機能
├── public/                 # 静的ファイル
├── components/             # 再利用可能コンポーネント
├── hooks/                  # カスタムフック
├── lib/                    # ユーティリティ関数
├── package.json           # 依存関係とスクリプト
├── tsconfig.json          # TypeScript設定
├── next.config.ts         # Next.js設定
└── tailwind.config.ts     # Tailwind CSS設定
```

## 開発Tips

- **Turbopack**: 高速バンドラーが有効になっているため、開発時のビルドが高速です
- **自動型チェック**: TypeScriptの型エラーはブラウザとターミナルの両方で表示されます
- **Hot Reload**: ファイル保存時に自動でページが更新されます
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワークが設定済みです

## サポート

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
