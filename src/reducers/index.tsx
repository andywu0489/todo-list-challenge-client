import { combineReducers } from "redux";
import filterReducer from "../features/filters/filtersSlice";
import todoReducer from "../features/todos/todosSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
