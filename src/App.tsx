import React from "react";
import CreateTodo from "./components/createTodo";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import EditTodo from "./components/editTodo";
import Header from "./components/header";

function App() {
  return (
    <main>
      <div className="App">
        <Header />
        {/* <div>
          <CreateTodo />
        </div> */}
      </div>
      <Switch>
        <Route path="/" component={CreateTodo} exact />
        <Route
          path="/todos/:id/edit"
          render={({ match }) => <EditTodo match={match} />}
        />
      </Switch>
    </main>
  );
}

export default App;
