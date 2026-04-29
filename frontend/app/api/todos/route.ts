import { NextRequest, NextResponse } from "next/server";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// インメモリのサンプルデータ
const todos: Todo[] = [
  { id: 1, title: "Next.js を学ぶ", completed: false },
  { id: 2, title: "TanStack Query を使う", completed: false },
  { id: 3, title: "XState を試す", completed: false },
];

// GET /api/todos
export async function GET() {
  return NextResponse.json(todos, { status: 200 });
}

// POST /api/todos
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json(
      { error: "title は必須の文字列です" },
      { status: 400 },
    );
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}
