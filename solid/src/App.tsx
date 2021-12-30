import { createSignal, onMount, Index } from "solid-js";

import "../../core.css";

function App() {
  const [todos, setTodos] = createSignal<string[]>([]);
  const [newTodo, setNewTodo] = createSignal("");

  // TODO: type kub
  const addTodo = (e: any) => {
    e.preventDefault();

    if (e.code !== "Enter") return;

    setTodos([...todos(), newTodo()]);
    setNewTodo("");
  };

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  onMount(() => {
    document.documentElement.style.setProperty("--app-color", "#4b7eb8");
  });

  return (
    <div class="container">
      <h1>
        With <span class="app-color">Solid</span>
      </h1>
      <input
        class="input"
        value={newTodo()}
        placeholder="กรอก ...."
        onKeyUp={addTodo}
        onChange={handleChange}
      />
      <ul class="display">
        {/* TODO: what the heck error */}
        <Index each={todos()}>
          {(todo, index) => (
            <li class="item">
              {todo()}
              <button onClick={() => removeTodo(index)}>X</button>
            </li>
          )}
        </Index>
      </ul>
    </div>
  );
}

export default App;
