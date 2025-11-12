import { Todo } from "./Todo";

export type TodoType = {
  id: number;
  title: string;
  done: boolean;
};

type TodoListProps = {
  todos: TodoType[];
  onToggle: (id: number) => void;
};

export function TodoList({ todos, onToggle }: TodoListProps) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Todo List</h3>

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          done={todo.done}
          onToggle={() => onToggle(todo.id)}
        />
      ))}
    </div>
  );
}
