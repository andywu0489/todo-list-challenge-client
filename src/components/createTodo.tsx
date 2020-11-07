import React, { useState, useEffect, MouseEvent } from 'react'
import {createTodo, getTodos} from '../api'
import ShowTodos from './showTodos'
import { Button, Input} from '@material-ui/core'
import './createTodo.scss'
import { setTask } from '../features/todos/todosSlice' 
import { useDispatch, useSelector } from 'react-redux'
import { AxiosResponse } from 'axios'
import { RootState } from '../reducers/index'
import './createTodo.scss'

function CreateTodo () {
    const [todos, setTodos] = useState<AxiosResponse | null>(null)
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
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(setTask(
        event.target.value
      ))

    const task = useSelector((state: RootState) => state.todo)

    const onCreateTodo = (event: MouseEvent) => {
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
            <div>
            <div className='form'>
                <Input
                name='task'
                value={task}
                type='text'
                placeholder='Task'
                onChange={handleChange}
                />
                <Button className='filter-button' onClick={onCreateTodo}>Submit</Button>
            </div>  
            <div>  
                <ShowTodos todos={todos} refreshList={refreshList}/>
            </div>
            </div>
        )
}

export default CreateTodo