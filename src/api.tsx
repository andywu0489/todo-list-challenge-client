import axios from "axios";

export const createTodo = (todo: string) => {
  return axios({
    url: "http://localhost:4000/todos/",
    method: "POST",
    data: { task: todo },
  });
};

export const editTodo = (id: number, data: object) => {
  return axios({
    url: `http://localhost:4000/todos/${id}`,
    method: "PATCH",
    data: data,
  });
};

export const getTodos = () => {
  return axios({
    url: `http://localhost:4000/todos/`,
    method: "GET",
  });
};
