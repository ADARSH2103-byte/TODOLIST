
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false }
  ]);
  let [newTodo, setNewTodo] = useState("");

  // Add new task
  let addNewTask = () => {
    if (newTodo.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false }
    ]);
    setNewTodo("");
  };

  // Input change
  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  // Delete task
  let deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // ⭐ Mark ALL as done
  let markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: true
      }))
    );
  };

  // Mark single task done
  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  return (
    <div>
      <input
        placeholder="Add task"
        value={newTodo}
        onChange={updateTodoValue}
      />

      <br /><br />

      <button onClick={addNewTask}>Add Task</button>

      <hr />

      <h4>Task TodoList</h4>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={
                todo.isDone
                  ? { textDecoration: "line-through" }
                  : {}
              }
            >
              {todo.task}
            </span>

            &nbsp;&nbsp;

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>

            &nbsp;

            <button onClick={() => markAsDone(todo.id)}>
              Mark Done
            </button>
          </li>
        ))}
      </ul>

      <br />

      <button onClick={markAllDone}>Mark All Done</button>
    </div>
  );
}