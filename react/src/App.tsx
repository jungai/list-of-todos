import { useState, useEffect } from "react";

import "../../core.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.code !== "Enter") return;

    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--app-color", "cyan");
  });

  return (
    <div className="container">
      <h1>
        With <span className="app-color">React</span>
      </h1>
      <input
        className="input"
        value={newTodo}
        placeholder="กรอก ...."
        onKeyUp={addTodo}
        onChange={handleChange}
      />
      <ul className="display">
        {todos.map((todo, index) => (
          <li className="item" key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
