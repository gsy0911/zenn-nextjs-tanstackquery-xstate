"use client";

import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "@xstate/react";
import type { Todo } from "@/app/api/todos/route";
import { todoMachine } from "./machine";

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("TODO の取得に失敗しました");
  return res.json();
}

async function createTodo(title: string): Promise<Todo> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("TODO の作成に失敗しました");
  return res.json();
}

export default function TodosXStatePage() {
  const queryClient = useQueryClient();
  const [snapshot, send] = useActor(todoMachine);
  const { title, error } = snapshot.context;
  const isModalOpen =
    snapshot.matches("creating") ||
    snapshot.matches("submitting") ||
    snapshot.matches("failure");
  const isSubmitting = snapshot.matches("submitting");

  const {
    data: todos,
    isPending,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["todos-xstate"],
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos-xstate"] });
      send({ type: "SUBMIT_SUCCESS" });
    },
    onError: (e) => {
      send({ type: "SUBMIT_ERROR", error: e.message });
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    send({ type: "SUBMIT" });
    mutation.mutate(title.trim());
  };

  return (
    <Container size="sm" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={1}>TODO 一覧 (XState)</Title>
        <Button onClick={() => send({ type: "OPEN_MODAL" })}>+ 新規作成</Button>
      </Group>

      <Modal
        opened={isModalOpen}
        onClose={() => !isSubmitting && send({ type: "CLOSE_MODAL" })}
        closeOnClickOutside={!isSubmitting}
        closeOnEscape={!isSubmitting}
        title="TODO を作成"
        centered
      >
        <Stack>
          <TextInput
            label="タイトル"
            placeholder="例: Next.js を学ぶ"
            value={title}
            onChange={(e) =>
              send({ type: "UPDATE_TITLE", title: e.currentTarget.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            error={error}
            disabled={isSubmitting}
          />
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => send({ type: "CLOSE_MODAL" })}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={!title.trim()}
            >
              作成
            </Button>
          </Group>
        </Stack>
      </Modal>

      {isPending && <Loader />}

      {isError && <Text c="red">{fetchError.message}</Text>}

      {todos && (
        <Stack>
          {todos.map((todo) => (
            <Card key={todo.id} shadow="sm" padding="md" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={500}>{todo.title}</Text>
                <Badge color={todo.completed ? "green" : "gray"}>
                  {todo.completed ? "完了" : "未完了"}
                </Badge>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
