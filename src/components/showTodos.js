import React from 'react'
import { editTodo } from '../api'
import './showTodos.scss'
import { Button, ListItem, List} from '@material-ui/core'
import { setFilter } from '../features/filters/filtersSlice' 
import { useDispatch, useSelector } from 'react-redux'

function ShowTodos (props) {

    const { todos, refreshList} = props
    const dispatch = useDispatch()

    const onShowAll = (event) => {
        dispatch(setFilter(
            {
                filterValue: 'SHOW_ALL'
            }
        ))
    }

    const onShowCompeted = (event) => {
        dispatch(setFilter(
            {
                filterValue: "SHOW_COMPLETED"
            }
        ))
    }

    const onShowOpen = (event) => {
        dispatch(setFilter(
            {
                filterValue: "SHOW_OPEN"
            }
        ))
    }

    const onEditTodo = (id) => {
        const data = {'completed': true}
        editTodo(id, data)
        refreshList()
    }

    const filter = useSelector(state => state.filter)

    const todoTemplate = (todo) => (
        <ListItem className='list-item' key={todo._id}>
            <div className="todo-item">
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
                {todos && filter.filterValue === 'SHOW_ALL' && todos.data.map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && filter.filterValue === 'SHOW_COMPLETED' && todos.data.filter(todo => todo.completed === true).map(todo => (
                    todoTemplate(todo)
                ))}
                 {todos && filter.filterValue === 'SHOW_OPEN' && todos.data.filter(todo => todo.completed === false).map(todo => (
                    todoTemplate(todo)
                ))}
                </List>
            </div>
        )
}

export default ShowTodos