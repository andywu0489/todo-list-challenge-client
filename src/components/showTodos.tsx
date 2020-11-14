import React, { MouseEvent } from "react";
import { Button, Card } from "@material-ui/core";
import { setFilter } from "../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/index";
import { completeTodo } from "../features/todos/todosSlice";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Image from "../post-it.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    border: {
      display: "flex",
      justifyContent: "center",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      border: "2px solid black",
      borderLeftStyle: "none",
      borderRightStyle: "none",
      backgroundColor: "white",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "20vw",
      height: "20vh",
      margin: "0 10px 10px 10px",
    },
    list: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "flex-end",
      width: "40vw",
      backgroundColor: "#a6ff9e",
      minHeight: "100vh",
      alignItems: "center",
      padding: "20px 10px",
    },
    container: {
      height: "100%",
      backgroundImage: `url(${Image})`,
    },
    task: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

function ShowTodos(props: any) {
  const classes = useStyles();
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
    <Card className={classes.card} key={todo._id}>
      <div className="todo-item">
        <div
          className={classes.task}
          style={{
            textDecorationLine: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </div>

        {!todo.completed && (
          <Button>
            <Link to={`todos/${todo._id}/edit`}>Edit</Link>
          </Button>
        )}
        {!todo.completed && (
          <Button onClick={() => onCompleteTodo(todo._id)}>Complete</Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <Button onClick={onShowAll}>All Tasks</Button>
        <Button onClick={onShowCompeted}>Completed Tasks</Button>
        <Button onClick={onShowOpen}>Open Tasks</Button>
      </div>
      <div className={classes.border}>
        <div className={classes.list}>
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
