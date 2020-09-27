import React from "react";
import Pokedex from "./Pokedex";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Pokemon from "./Pokemon";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route
        exact
        path="/:pokemonId"
        render={(props) => <Pokemon {...props} />}
      />
    </Switch>
  );
}

export default App;
