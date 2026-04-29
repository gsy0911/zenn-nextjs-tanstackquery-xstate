import Link from "next/link";

const pages = [
  {
    href: "/todos",
    title: "TODO 一覧",
    description: "TanStack Query のみで GET / POST を管理するページ",
  },
  {
    href: "/todos-xstate",
    title: "TODO 一覧 (XState)",
    description: "TanStack Query + XState で状態遷移を管理するページ",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white dark:bg-zinc-900">
      <main className="w-full max-w-xl px-8 py-20">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          サンプルページ一覧
        </h1>
        <p className="mb-10 text-zinc-500 dark:text-zinc-400">
          Next.js + TanStack Query + XState + Mantine のデモ
        </p>
        <ul className="flex flex-col gap-4">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white px-6 py-4 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {page.title}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {page.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
