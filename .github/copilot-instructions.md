# Copilot Instructions

このリポジトリは Next.js + TanStack Query + XState + Mantine UI を使ったサンプルプロジェクトです。

## プロジェクト構成

- **`frontend/`** — Next.js アプリケーション本体（App Router）

## 技術スタック

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** — ユーティリティファーストのスタイリング
- **Mantine UI 9** — UI コンポーネントライブラリ
- **TanStack Query 5** — サーバー状態管理・データフェッチング
- **XState 5** — クライアント側のステートマシン
- **Biome 2** — Linter / Formatter（ESLint・Prettier の代替）

## コーディング規約

- **Linter / Formatter は Biome を使用する**。ESLint・Prettier は使わない
- コードを変更したら `npm run check` を実行して問題がないか確認する
- TypeScript の `any` は使用しない（Biome ルールで error）
- `var` は使用しない。`const` / `let` を使う
- CommonJS (`require`) は使用しない。ESModule (`import`) を使う

## ファイル配置規則

- API Route Handler は `frontend/app/api/<リソース名>/route.ts` に配置する
- 共通プロバイダーは `frontend/app/providers.tsx` にまとめる
- 新しいライブラリのプロバイダーを追加する場合は `providers.tsx` に追記する

## よく使うコマンド

```bash
cd frontend

npm run dev      # 開発サーバー起動
npm run build    # ビルド確認
npm run check    # Biome チェック（変更後に必ず実行）
npx tsc --noEmit # 型チェック
```

## 注意事項

- `MantineProvider` は `providers.tsx` でラップ済み。コンポーネントで Mantine の hooks / コンポーネントをそのまま使える
- `QueryClientProvider` も `providers.tsx` でラップ済み。`useQuery` / `useMutation` をそのまま使える
- API Route のサンプルは `frontend/app/api/todos/route.ts` を参照
