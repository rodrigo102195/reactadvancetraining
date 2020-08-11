import React from "react";
import { Route, Switch } from "react-router-dom";
import AddQuestion from "./AddQuestion/AddQuestion";
import PlayGame from "./Play/Play";
import PlayingGame from "./PlayingGame/PlayingGame";
import Home from "./Home/Home";
import "./App.scss";
import { RoutersConstants } from "../constants";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={RoutersConstants.addQuestion}>
          <AddQuestion />
        </Route>
        <Route path={RoutersConstants.start}>
          <PlayGame />
        </Route>
        <Route path={RoutersConstants.playing}>
          <PlayingGame />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
