# zenn-nextjs-tanstackquery-xstate

Next.js + TanStack Query + XState + Mantine UI を組み合わせたサンプルプロジェクトです。

## 技術スタック

| カテゴリ | ライブラリ | バージョン |
|---|---|---|
| フレームワーク | Next.js (App Router) | 16.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| UI コンポーネント | Mantine UI | 9.x |
| サーバー状態管理 | TanStack Query | 5.x |
| クライアント状態管理 | XState | 5.x |
| Linter / Formatter | Biome | 2.x |

## ディレクトリ構成

```
.
├── frontend/               # Next.js アプリケーション
│   ├── app/
│   │   ├── api/
│   │   │   └── todos/
│   │   │       └── route.ts   # サンプル API (GET / POST)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx      # MantineProvider + QueryClientProvider
│   ├── biome.json
│   ├── package.json
│   └── ...
└── README.md
```

## セットアップ

```bash
cd frontend
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## スクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run lint     # Biome でコードチェック
npm run format   # Biome でフォーマット
npm run check    # Biome で lint + format + import 整列
```

## サンプル API

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/todos` | Todo 一覧を取得 |
| POST | `/api/todos` | Todo を新規作成 (`{ "title": "..." }`) |
