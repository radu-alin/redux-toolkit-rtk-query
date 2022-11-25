// add imports
import { useState, FormEvent } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../api/apiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
  console.log('%c-> developmentConsole: todos= ', 'color:#77dcfd', todos);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const getRandomNumber = () => Math.floor(Math.random() * 999);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      id: getRandomNumber(),
      userId: 1,
      title: newTodo,
      completed: false,
    });
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo: any) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
            />
            <label htmlFor={todo.id}>
              {todo.id}. {todo.title}
            </label>
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>"Something went wrong."</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
