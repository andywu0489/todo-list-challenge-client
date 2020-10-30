import React from 'react';
import CreateTodo from './components/createTodo'
import './App.scss'

function App() {
  return (
    <div className="App">
      <header>TODO LIST</header>
      <div><CreateTodo/></div>
    </div>
  );
}

export default App;
