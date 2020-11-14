import React from "react";
import CreateTodo from "./components/createTodo";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import EditTodo from "./components/editTodo";
import Header from "./components/header";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // display: "flex",
      // justifyContent: "center",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <main>
      <div className="App">
        <Header />
      </div>
      <Switch>
        <div className={classes.container}>
          <Route path="/" component={CreateTodo} exact />
          <Route
            path="/todos/:id/edit"
            render={({ match }) => <EditTodo match={match} />}
          />
        </div>
      </Switch>
    </main>
  );
}

export default App;
