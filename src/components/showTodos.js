import React, { Component } from 'react'
import { editTodo } from '../api'

class ShowTodos extends Component {
    constructor () {
        super () 
        this.state = {
            showAll: true,
            showCompleted: false,
            showOpen: false
        }
    }

    showAll = () => {
        this.setState({
            showAll: true,
            showCompleted: false,
            showOpen: false
        })
    }

    showCompeted = () => {
        this.setState({
            showAll: false,
            showCompleted: true,
            showOpen: false
        })
    }

    showOpen = () => {
        this.setState({
            showAll: false,
            showCompleted: false,
            showOpen: true
        })
    }

    onEditTodo = (id) => {
        const data = { 'completed': true}
        editTodo(id, data)
        .then(this.props.refreshList())
    }

    todo = (todo) => (
        <div key={todo._id}>
            <div  style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>{todo.task}</div>
            {!todo.completed && <button onClick={() => this.onEditTodo(todo._id)}>Complete</button>}
        </div>
    )

    render () {
        const { showAll, showCompleted, showOpen } = this.state
        const { todos } = this.props
        return (
            <div >
                <button onClick={this.showAll}>All Tasks</button>
                <button onClick={this.showCompeted}>Completed Tasks</button>
                <button onClick={this.showOpen}>Open Tasks</button>
                {todos && todos.data.length === 0 && <p>No Tasks Recored</p>}
                {todos && showAll && todos.data.reverse().map(todo => (
                    this.todo(todo)
                ))}
                 {todos && showCompleted && todos.data.filter(todo => todo.completed === true).reverse().map(todo => (
                    this.todo(todo)
                ))}
                 {todos && showOpen && todos.data.filter(todo => todo.completed === false).reverse().map(todo => (
                    this.todo(todo)
                ))}
            </div>
        )
    }
}

export default ShowTodos