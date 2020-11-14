import React, { useState, MouseEvent } from "react";
import ShowTodos from "./showTodos";
import { Button, TextField } from "@material-ui/core";
import { setTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: "20px",
    },
  })
);

function CreateTodo() {
  const classes = useStyles();
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

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
      <div className={classes.form}>
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
        <ShowTodos />
      </div>
    </div>
  );
}

export default CreateTodo;
