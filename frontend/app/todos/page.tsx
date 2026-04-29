"use client";

import {
	Badge,
	Card,
	Container,
	Loader,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/app/api/todos/route";

async function fetchTodos(): Promise<Todo[]> {
	const res = await fetch("/api/todos");
	if (!res.ok) {
		throw new Error("TODO の取得に失敗しました");
	}
	return res.json();
}

export default function TodosPage() {
	const {
		data: todos,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
	});

	return (
		<Container size="sm" py="xl">
			<Title order={1} mb="lg">
				TODO 一覧
			</Title>

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
