import { combineReducers } from 'redux'
import filterReducer from '../features/filters/filtersSlice'
import todoReducer from '../features/todos/todosSlice'

export default combineReducers({
  filter: filterReducer,
  todo: todoReducer
})