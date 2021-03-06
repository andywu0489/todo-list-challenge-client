import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, editTodo } from "../../api";

export const getTodoList = createAsyncThunk("todos/getTodoList", async () => {
  const response = await getTodos();
  return response.data;
});

export const setTodo = createAsyncThunk(
  "todos/setTodo",
  async (task: string) => {
    const response = await createTodo(task);
    return response.data;
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async (id: number) => {
    const data: object = { completed: true };
    const response = await editTodo(id, data);
    return response.data;
  }
);

export const editTodoDesc = createAsyncThunk(
  "todos/editTodoDesc",
  async (obj: any) => {
    const response = await editTodo(obj.id, obj.data);
    return response.data;
  }
);

interface getTodoList {
  fulfilled: any;
}

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers: {
    [getTodoList.fulfilled.toString()]: (state, action) => {
      state.todos = action.payload;
    },
    [setTodo.fulfilled.toString()]: (state, action) => {
      state.todos = state.todos.concat(action.payload);
    },
    [completeTodo.fulfilled.toString()]: (state, action) => {
      const { _id } = action.payload;
      const todo: any = state.todos.find((todo: any) => todo._id === _id);
      todo.completed = true;
    },
    [editTodoDesc.fulfilled.toString()]: (state, action) => {
      const { _id, task } = action.payload;
      const todo: any = state.todos.find((todo: any) => todo._id === _id);
      todo.task = task;
    },
  },
});

export default todosSlice.reducer;
