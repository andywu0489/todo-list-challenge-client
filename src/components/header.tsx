import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { getTodoList } from "../features/todos/todosSlice";

function Header () {

    const dispatch = useDispatch()

    const refreshList = () => {
        dispatch(getTodoList());
      };

    useEffect(() => {
        refreshList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <header>TODO-LIST CHALLENGE</header>
      )
}

export default Header 