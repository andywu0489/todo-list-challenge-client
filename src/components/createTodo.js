import React, { Component } from 'react'
import {createTodo, getTodos}from '../api'
import ShowTodos from './showTodos'

class CreateTodo extends Component {
    constructor () {
        super()
        this.state ={
            task: '',
            completed: false,
            todos: ''
        }
    }

    refreshList = () => {
        getTodos()
        .then(response => {
            this.setState({todos: response})})
    }

    componentDidMount = () => {
        this.refreshList()
    }
    
    handleChange = event => this.setState({
        [event.target.name]: event.target.value
      })

    onCreateTodo = (event) => {
        event.preventDefault()
        createTodo(this.state)
            .then(() => {
               this.refreshList()
                this.setState({
                    task: ''
                })
            })
            .catch(() => {
                this.setState({
                    task:''
                })
            })
    }

    render () {
        const {task, todos} = this.state
        return (
            <div className='form'>
                <input
                name='task'
                value={task}
                type='text'
                placeholder='Task'
                onChange={this.handleChange}
                />
                <button onClick={this.onCreateTodo}>Submit</button>
                <div><ShowTodos todos={todos} refreshList={this.refreshList}/></div>
            </div>
        )
    }
}

export default CreateTodo