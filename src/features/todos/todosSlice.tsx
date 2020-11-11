import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getTodos } from '../../api'

export const getTodoList = createAsyncThunk(
  'todos/getTodoList',
    async () => {
      const response = await getTodos()
      return response.data
    }
  )

interface initialState {
  todos: any
}

const initialState = {
  todos: []
}

interface getTodoList{
  fulfilled: any
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodoList(state, action) {
        return action.payload
    }
  },
  extraReducers: {
    [getTodoList.fulfilled.toString()]: (state, action: PayloadAction) => {
      return action.payload
    }
  }
})

export const { setTodoList } = todosSlice.actions

export default todosSlice.reducer