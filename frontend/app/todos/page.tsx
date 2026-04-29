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
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTodo, fetchTodos } from "@/utils/todos";

export default function TodosPage() {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const [title, setTitle] = useState("");

  const {
    data: todos,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      close();
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutation.mutate(title.trim());
  };

  return (
    <Container size="sm" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={1}>TODO 一覧</Title>
        <Button onClick={open}>+ 新規作成</Button>
      </Group>

      <Modal opened={opened} onClose={close} title="TODO を作成" centered>
        <Stack>
          <TextInput
            label="タイトル"
            placeholder="例: Next.js を学ぶ"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            error={mutation.isError ? mutation.error.message : undefined}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              loading={mutation.isPending}
              disabled={!title.trim()}
            >
              作成
            </Button>
          </Group>
        </Stack>
      </Modal>

      {isPending && <Loader />}

      {isError && <Text c="red">{error.message}</Text>}

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
