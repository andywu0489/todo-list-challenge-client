import axios from 'axios'

export const createTodo = (todo) => {
    return axios({
        url: 'http://localhost:4000/todos/',
        method: 'POST',
        data: todo
    })
}

export const editTodo = (id, data) => {
    return axios({
        url: `http://localhost:4000/todos/${id}`,
        method: 'PATCH',
        data: data
    })
}

export const getTodos = () => {
    return axios({
        url: `http://localhost:4000/todos/`,
        method: 'GET'
    })
}