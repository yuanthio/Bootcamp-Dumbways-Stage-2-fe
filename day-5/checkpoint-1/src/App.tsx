import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/Todolist";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="font-semibold text-lg">Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
