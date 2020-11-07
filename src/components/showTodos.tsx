import React, { MouseEvent } from 'react'
import { editTodo } from '../api'
import './showTodos.scss'
import { Button, Card} from '@material-ui/core'
import { setFilter } from '../features/filters/filtersSlice' 
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers/index'

function ShowTodos (props: any) {

    const { todos, refreshList} = props
    const dispatch = useDispatch()

    const onShowAll = (event: MouseEvent) => {
        dispatch(setFilter(
            {
                filterValue: 'SHOW_ALL'
            }
        ))
    }

    const onShowCompeted = (event: MouseEvent) => {
        dispatch(setFilter(
            {
                filterValue: "SHOW_COMPLETED"
            }
        ))
    }

    const onShowOpen = (event: MouseEvent) => {
        dispatch(setFilter(
            {
                filterValue: "SHOW_OPEN"
            }
        ))
    }

    const onEditTodo = (id: number) => {
        const data = {'completed': true}
        editTodo(id, data)
        refreshList()
    }

    const filter = useSelector((state: RootState) => state.filter)

    const todoTemplate = (todo: any) => (
            <Card className='card' key={todo._id}>
            <div className="todo-item">
                <div  style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>{todo.task}</div>
                {!todo.completed && <Button onClick={() => onEditTodo(todo._id)}>Complete</Button>}
            </div>
            </Card>
    )

        return (
            <div className='container'>
                <div className='button-container'>
                    <Button onClick={onShowAll}>All Tasks</Button>
                    <Button onClick={onShowCompeted}>Completed Tasks</Button>
                    <Button onClick={onShowOpen}>Open Tasks</Button>
                </div>
                <div className='border'>
                <div className='list'>
                {todos && todos.data.length === 0 && <p>No Tasks Recored</p>}
                {todos && filter.filterValue === 'SHOW_ALL' && todos.data.map((todo: any) => (
                    todoTemplate(todo)
                ))}
                 {todos && filter.filterValue === 'SHOW_COMPLETED' && todos.data.filter((todo: any) => todo.completed === true).map((todo: any)=> (
                    todoTemplate(todo)
                ))}
                 {todos && filter.filterValue === 'SHOW_OPEN' && todos.data.filter((todo: any) => todo.completed === false).map((todo: any) => (
                    todoTemplate(todo)
                ))}
                </div>
                </div>
            </div>
        )
}

export default ShowTodos