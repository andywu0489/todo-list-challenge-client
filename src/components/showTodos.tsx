import React, { MouseEvent } from "react";
import "./showTodos.scss";
import { Button, Card } from "@material-ui/core";
import { setFilter } from "../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/index";
import { completeTodo } from "../features/todos/todosSlice";
import { Link } from "react-router-dom";

function ShowTodos(props: any) {
  const dispatch = useDispatch();

  const onShowAll = (event: MouseEvent) => {
    dispatch(
      setFilter({
        filterValue: "SHOW_ALL",
      })
    );
  };

  const onShowCompeted = (event: MouseEvent) => {
    dispatch(
      setFilter({
        filterValue: "SHOW_COMPLETED",
      })
    );
  };

  const onShowOpen = (event: MouseEvent) => {
    dispatch(
      setFilter({
        filterValue: "SHOW_OPEN",
      })
    );
  };

  const onCompleteTodo = (id: number) => {
    dispatch(completeTodo(id));
  };

  const todos: any = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.filter);

  interface Todo {
    _id: number;
    completed: boolean;
    task: string;
  }

  const todoTemplate = (todo: Todo) => (
    <Card className="card" key={todo._id}>
      <div className="todo-item">
        <div
          style={{
            textDecorationLine: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </div>
        <Link to={`todos/${todo._id}/edit`}>Edit</Link>
        {!todo.completed && (
          <Button onClick={() => onCompleteTodo(todo._id)}>Complete</Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="container">
      <div className="button-container">
        <Button onClick={onShowAll}>All Tasks</Button>
        <Button onClick={onShowCompeted}>Completed Tasks</Button>
        <Button onClick={onShowOpen}>Open Tasks</Button>
      </div>
      <div className="border">
        <div className="list">
          {todos && todos.length === 0 && <p>No Tasks Recored</p>}
          {todos &&
            todos.length > 0 &&
            filter.filterValue === "SHOW_ALL" &&
            todos.map((todo: Todo) => todoTemplate(todo))}
          {todos &&
            todos.length > 0 &&
            filter.filterValue === "SHOW_COMPLETED" &&
            todos
              .filter((todo: Todo) => todo.completed === true)
              .map((todo: Todo) => todoTemplate(todo))}
          {todos &&
            todos.length > 0 &&
            filter.filterValue === "SHOW_OPEN" &&
            todos
              .filter((todo: Todo) => todo.completed === false)
              .map((todo: Todo) => todoTemplate(todo))}
        </div>
      </div>
    </div>
  );
}

export default ShowTodos;
