import type { Todo } from "@/app/api/todos/route";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("TODO の取得に失敗しました");
  return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("TODO の作成に失敗しました");
  return res.json();
}
