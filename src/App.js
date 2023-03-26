import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  var todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
    var name = todoName.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoName.current.value = null;
  }

  function handleClearTodo() {
    const clearTodos = todos.filter((todo) => !todo.complete);
    setTodos(clearTodos);
  }

  return (
    <div class="main">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div class="input-add">
        <input
          class="input-space"
          ref={todoName}
          placeholder="Enter Todo"
          type="text"
        />
        <button onClick={handleAddTodo} class="btn-add">
          Add Todo
        </button>
      </div>
      <button class="btn-cmt" onClick={handleClearTodo}>
        Clear Completed Todos
      </button>
      <div class="counter">
        {todos.filter((todo) => !todo.complete).length} Todos Left
      </div>
    </div>
  );
}

export default App;
