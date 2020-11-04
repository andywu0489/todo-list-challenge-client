import React, { useState, useEffect } from 'react'
import {createTodo, getTodos} from '../api'
import ShowTodos from './showTodos'
import { Button, Input} from '@material-ui/core'
import './createTodo.scss'

function CreateTodo () {
    const [task, setTask] = useState('')
    const [todos, setTodos] = useState('')

    const refreshList = () => {
        getTodos()
        .then(response => {
            setTodos(response)
    })}

    useEffect(() => {
        refreshList()
    }, []
    )
    
    const handleChange = event => setTask(
        event.target.value
      )

    const onCreateTodo = (event) => {
        event.preventDefault()
        createTodo(task)
            .then(() => {
               refreshList()
                setTask('')
            })
            .catch(() => {
                setTask('')
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