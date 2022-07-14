import React from "react";

export default function Todo({ todo , toggleTodos}) {
  function handleTodoClick(){
    toggleTodos(todo.id)
  }
  return (
    <div>
      <label>
        <input type="checkbox" onChange={handleTodoClick} checked={todo.complete}/>
        {todo.name}
      </label>
    </div>
  );
}
