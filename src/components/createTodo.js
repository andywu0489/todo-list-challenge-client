import React, { useState, useEffect } from 'react'
import {createTodo, getTodos} from '../api'
import ShowTodos from './showTodos'
import { Button, Input} from '@material-ui/core'
import './createTodo.scss'
import { setTask } from '../features/todos/todosSlice' 
import { useDispatch, useSelector } from 'react-redux'

function CreateTodo () {
    const [todos, setTodos] = useState('')
    const dispatch = useDispatch()

    const refreshList = () => {
        getTodos()
        .then(response => {
            setTodos(response)
    })}

    useEffect(() => {
        refreshList()
    }, []
    )
    
    const handleChange = event => dispatch(setTask(
        event.target.value
      ))

    const task = useSelector(state => state.todo)

    const onCreateTodo = (event) => {
        event.preventDefault()
        createTodo(task)
            .then(() => {
               refreshList()
                dispatch(setTask(''))
            })
            .catch(() => {
                dispatch(setTask(''))
            })
    }

        return (
            <div className='form'>
                <Input
                name='task'
                value={task}
                type='text'
                placeholder='Task'
                onChange={handleChange}
                />
                <Button onClick={onCreateTodo}>Submit</Button>
                <ShowTodos todos={todos} refreshList={refreshList}/>
            </div>
        )
}

export default CreateTodo