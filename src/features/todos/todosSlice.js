import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: '',
  reducers: {
    setTask(state, action) {
      return action.payload
    },
    editTask(state, action) {
        return action.payload
    }
  }
})

export const { setTask, editTask } = todosSlice.actions

export default todosSlice.reducer