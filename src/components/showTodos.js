import React, { useState } from 'react'
import { editTodo } from '../api'
import './showTodos.scss'
import { Button, ListItem, List} from '@material-ui/core'

function ShowTodos (props) {

    const { todos, refreshList} = props

    const [showAll, setShowAll] = useState(true)
    const [showCompleted, setShowCompleted] = useState(false)
    const [showOpen, setShowOpen] = useState(false)

    const onShowAll = () => {
        setShowAll(true)
        setShowCompleted(false)
        setShowOpen(false)
    }

    const onShowCompeted = () => {
        setShowAll(false)
        setShowCompleted(true)
        setShowOpen(false)
    }

    const onShowOpen = () => {
        setShowAll(false)
        setShowCompleted(false)
        setShowOpen(true)
    }

    const onEditTodo = (id) => {
        const data = {'completed': true}
        debugger
        editTodo(id, data)
        refreshList()
    }

    const todoTemplate = (todo) => (
        <ListItem className='list-item'>
            <div className="todo-item" key={todo._id}>
                <div  style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>{todo.task}</div>
                {!todo.completed && <Button onClick={() => onEditTodo(todo._id)}>Complete</Button>}
            </div>
        </ListItem>
    )

        return (
            <div >
                <div className='button-container'>
                    <Button onClick={onShowAll}>All Tasks</Button>
                    <Button onClick={onShowCompeted}>Completed Tasks</Button>
                    <Button onClick={onShowOpen}>Open Tasks</Button>
                </div>
                <List className='list'>
                {todos && todos.data.length === 0 && <p>No Tasks Recored</p>}
                {todos && showAll && todos.data.map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && showCompleted && todos.data.filter(todo => todo.completed === true).map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && showOpen && todos.data.filter(todo => todo.completed === false).map(todo => (
                    todoTemplate(todo)
                ))}
                </List>
            </div>
        )
}

export default ShowTodos