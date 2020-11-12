import React, { useState, useEffect, MouseEvent } from "react";
// import { createTodo } from '../api'
import ShowTodos from "./showTodos";
import { Button, TextField } from "@material-ui/core";
import "./createTodo.scss";
import { getTodoList, setTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

function CreateTodo() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const refreshList = () => {
    dispatch(getTodoList());
  };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTask(event.target.value);

  const onCreateTodo = async (event: MouseEvent) => {
    event.preventDefault();
    await dispatch(setTodo(task));
    try {
      setTask("");
    } catch {
      setTask("");
    }
  };

  return (
    <div>
      <div className="form">
        <TextField
          name="task"
          value={task}
          type="text"
          variant="outlined"
          label="Task"
          onChange={handleChange}
        />
        <Button className="filter-button" onClick={onCreateTodo}>
          Submit
        </Button>
      </div>
      <div>
        <ShowTodos refreshList={refreshList} />
      </div>
    </div>
  );
}

export default CreateTodo;
