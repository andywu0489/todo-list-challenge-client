import React, { useState } from 'react'
import { editTodo } from '../api'

function ShowTodos (props) {

    console.log('props', props.todos)
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
        editTodo(id, data)
        refreshList()
    }

    const todoTemplate = (todo) => (
        <div className="todo-item" key={todo._id}>
            <div  style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>{todo.task}</div>
            {!todo.completed && <button onClick={() => onEditTodo(todo._id)}>Complete</button>}
        </div>
    )

        return (
            <div >
                <button onClick={onShowAll}>All Tasks</button>
                <button onClick={onShowCompeted}>Completed Tasks</button>
                <button onClick={onShowOpen}>Open Tasks</button>
                {todos && todos.data.length === 0 && <p>No Tasks Recored</p>}
                {todos && showAll && todos.data.reverse().map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && showCompleted && todos.data.filter(todo => todo.completed === true).reverse().map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && showOpen && todos.data.filter(todo => todo.completed === false).reverse().map(todo => (
                    todoTemplate(todo)
                ))}
            </div>
        )
}

export default ShowTodos