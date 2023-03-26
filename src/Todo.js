import React from "react";
import "./Todo.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div class="todoitems">
      <label>
        <input
          class="check-input"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        ></input>
        {todo.name}
      </label>
    </div>
  );
}
