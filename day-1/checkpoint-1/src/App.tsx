import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { TodoType } from "./components/TodoList";

function App() {
  const textBtnAdd: string = "Add";
  const [counter, setCounter] = useState(0);

  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "Belajar React", done: false },
    { id: 2, title: "Belajar TypeScript", done: false },
    { id: 3, title: "Belajar Express", done: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <>
      <Counter text={counter} />
      <Button
        text={textBtnAdd}
        eventOnClick={() => setCounter(counter + 1)}
      />

      <TodoList todos={todos} onToggle={toggleTodo} />
    </>
  );
}

export default App;
