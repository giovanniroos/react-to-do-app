import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuid from 'react-uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(!storedTodos)
      storedTodos = JSON.parse(storedTodos)
    if(storedTodos) setTodos()
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodos(id){
    const newTodos = [...todos]
    const currTodo = newTodos.find( todo => todo.id===id )
    currTodo.complete = !currTodo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      if(!prevTodos) 
      prevTodos = [];
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function getNotCompletedTodos(){
    if(!todos) return 0
    const count = todos.filter(todo => !todo.complete).length;
    return count
  }

  function handleClearTodos(){
    const completedTodos = todos.filter(todo => !todo.complete)
    setTodos(completedTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodos={toggleTodos}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{getNotCompletedTodos()} left to do</div>
    </>
  );
}

export default App;
