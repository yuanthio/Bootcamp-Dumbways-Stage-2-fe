import { useState } from "react";
import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
  const [text, setText] = useState("");
  const {createTodo, loading} = useTodo();

  const handleForm = (e:React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    createTodo(text);
    setText('');
  };
  return (
    <form onSubmit={handleForm} className="flex gap-3 p-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2"
        placeholder="Add new task..."
        disabled={loading}
        required
      />
      <button type="submit" disabled={loading}>Add</button>
    </form>
  );
}
