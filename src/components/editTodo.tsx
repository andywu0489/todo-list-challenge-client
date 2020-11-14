import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { editTodoDesc } from "../features/todos/todosSlice";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editForm: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      border: "1px solid black",
      width: "50vw",
      height: "25vh",
      padding: "5px 30px",
      marginTop: "30px",
    },
    label: {
      display: "flex",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

function EditTodo(props: any) {
  const classes = useStyles();
  const [todo, setTodo] = useState({
    task: "",
  });
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const obj: any = useSelector((state: RootState) =>
    state.todos.todos.find((todo: any) => todo._id === props.match.params.id)
  );

  useEffect(() => {
    obj && setTodo(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      task: event.target.value,
    });
  };

  const onEditTodo = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await dispatch(
      editTodoDesc({
        id: props.match.params.id,
        data: {
          task: todo.task,
        },
      })
    );
    try {
      setRedirect(true);
    } catch {}
  };

  const onCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.editForm}>
        <h3 className={classes.label}> Edit Todo </h3>
        <TextField
          label="Description"
          name="Todo"
          onChange={handleChange}
          value={todo.task}
          type="text"
          variant="outlined"
        />
        <Button className="edit-button" onClick={onEditTodo}>
          Submit
        </Button>
        <Button className="edit-button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default EditTodo;
